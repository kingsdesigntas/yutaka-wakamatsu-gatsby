const {
  DEFAULT_OPTIONS,
  imageClass,
  imageBackgroundClass,
  imageWrapperClass,
} = require(`./constants`)

const _ = require(`lodash`)
const { fluid, stats, traceSVG } = require(`gatsby-plugin-sharp`)
const chalk = require(`chalk`)
const queryString = require(`query-string`)
const path = require(`path`)
const { slash } = require(`gatsby-core-utils`)

// const unified = require("unified")
// const markdown = require("remark-parse")
// var parse = require("rehype-parse")
// const remark2rehype = require("remark-rehype")
// var rehype2remark = require("rehype-remark")
// const html = require("rehype-stringify")
// const visit = require("unist-util-visit")
// var stringify = require("remark-stringify")

var rehype = require("rehype")
var format = require("rehype-format")
const remark2rehype = require("remark-rehype")
const markdown = require("remark-parse")
var hastUtiltoHtml = require("hast-util-to-html")
var visit = require("unist-util-visit")

const compiler = {
  htmlToAST: string => {
    let tree
    rehype()
      .use(format)
      .use(() => _tree => (tree = _tree))
      .process(string)

    return tree
  },

  mdToAST: string => {
    let tree
    rehype()
      .use(markdown)
      .use(remark2rehype)
      .use(() => _tree => (tree = _tree))
      .process(string)

    return tree
  },

  toHTML: ast => hastUtiltoHtml(ast, { allowDangerousHtml: true }),
}

function replaceGatsbyImage({
  markdownNode,
  getNode,
  files,
  reporter,
  cache,
  options,
  assetsPath,
}) {
  const getImageInfo = uri => {
    const { url, query } = queryString.parseUrl(uri)
    return {
      ext: path.extname(url).split(`.`).pop(),
      url,
      query,
    }
  }

  // Takes a node and generates the needed images and then returns
  // the needed HTML replacement for the image
  const generateImageHTML = async function (node, inLink) {
    if (!node.properties.src) return null
    let imagePath = slash(
      path.join(assetsPath, getImageInfo(node.properties.src).url)
    )

    const imageNode = _.find(files, file => {
      if (file && file.absolutePath) {
        return file.absolutePath === imagePath
      }
      return null
    })

    if (!imageNode || !imageNode.absolutePath) {
      return null
    }

    let fluidResult = await fluid({
      file: imageNode,
      args: options,
      reporter,
      cache,
    })

    if (!fluidResult) {
      return null
    }

    const originalImg = fluidResult.originalImg
    const fallbackSrc = fluidResult.src
    const srcSet = fluidResult.srcSet
    const presentationWidth = fluidResult.presentationWidth

    // Generate default alt tag
    const srcSplit = getImageInfo(node.properties.src).url.split(`/`)
    const fileName = srcSplit[srcSplit.length - 1]
    const fileNameNoExt = fileName.replace(/\.[^/.]+$/, ``)
    const defaultAlt = fileNameNoExt.replace(/[^A-Z0-9]/gi, ` `)

    const alt = _.escape(node.alt ? node.alt : defaultAlt)

    const title = node.title ? _.escape(node.title) : alt

    const loading = options.loading

    if (![`lazy`, `eager`, `auto`].includes(loading)) {
      reporter.warn(
        reporter.stripIndent(`
        ${chalk.bold(loading)} is an invalid value for the ${chalk.bold(
          `loading`
        )} option. Please pass one of "lazy", "eager" or "auto".
      `)
      )
    }

    const imageStyle = `
      width: 100%;
      height: 100%;
      margin: 0;
      vertical-align: middle;
      position: absolute;
      top: 0;
      left: 0;`.replace(/\s*(\S+:)\s*/g, `$1`)

    // Create our base image tag
    let imageTag = `
      <img
        class="${imageClass}"
        alt="${alt}"
        title="${title}"
        src="${fallbackSrc}"
        srcset="${srcSet}"
        sizes="${fluidResult.sizes}"
        style="${imageStyle}"
        loading="${loading}"
      />
    `.trim()

    // if options.withWebp is enabled, generate a webp version and change the image tag to a picture tag
    if (options.withWebp) {
      const webpFluidResult = await fluid({
        file: imageNode,
        args: _.defaults(
          { toFormat: `WEBP` },
          // override options if it's an object, otherwise just pass through defaults
          options.withWebp === true ? {} : options.withWebp,
          DEFAULT_OPTIONS
        ),
        reporter,
      })

      if (!webpFluidResult) {
        return null
      }

      imageTag = `
      <picture>
        <source
          srcset="${webpFluidResult.srcSet}"
          sizes="${webpFluidResult.sizes}"
          type="${webpFluidResult.srcSetType}"
        />
        <source
          srcset="${srcSet}"
          sizes="${fluidResult.sizes}"
          type="${fluidResult.srcSetType}"
        />
        <img
          class="${imageClass}"
          src="${fallbackSrc}"
          alt="${alt}"
          title="${title}"
          loading="${loading}"
          style="${imageStyle}"
        />
      </picture>
      `.trim()
    }

    let placeholderImageData = fluidResult.base64

    // if options.tracedSVG is enabled generate the traced SVG and use that as the placeholder image
    if (options.tracedSVG) {
      let args = typeof options.tracedSVG === `object` ? options.tracedSVG : {}

      // Translate Potrace constants (e.g. TURNPOLICY_LEFT, COLOR_AUTO) to the values Potrace expects
      const { Potrace } = require(`potrace`)
      const argsKeys = Object.keys(args)
      args = argsKeys.reduce((result, key) => {
        const value = args[key]
        result[key] = Potrace.hasOwnProperty(value) ? Potrace[value] : value
        return result
      }, {})

      const tracedSVG = await traceSVG({
        file: imageNode,
        args,
        fileArgs: args,
        cache,
        reporter,
      })

      // Escape single quotes so the SVG data can be used in inline style attribute with single quotes
      placeholderImageData = tracedSVG.replace(/'/g, `\\'`)
    }

    const ratio = `${(1 / fluidResult.aspectRatio) * 100}%`

    const wrapperStyle =
      typeof options.wrapperStyle === `function`
        ? options.wrapperStyle(fluidResult)
        : options.wrapperStyle

    // Construct new image node w/ aspect ratio placeholder
    const imageCaption = false

    let removeBgImage = false
    if (options.disableBgImageOnAlpha) {
      const imageStats = await stats({ file: imageNode, reporter })
      if (imageStats && imageStats.isTransparent) removeBgImage = true
    }
    if (options.disableBgImage) {
      removeBgImage = true
    }

    const bgImage = removeBgImage
      ? ``
      : ` background-image: url('${placeholderImageData}'); background-size: cover;`

    let rawHTML = `
  <span
    class="${imageBackgroundClass}"
    style="padding-bottom: ${ratio}; position: relative; bottom: 0; left: 0;${bgImage} display: block;"
  ></span>
  ${imageTag}
  `.trim()

    // Make linking to original image optional.
    if (!inLink && options.linkImagesToOriginal) {
      rawHTML = `
  <a
    class="gatsby-resp-image-link"
    href="${originalImg}"
    style="display: block"
    target="_blank"
    rel="noopener"
  >
    ${rawHTML}
  </a>
    `.trim()
    }

    rawHTML = `
    <span
      class="${imageWrapperClass}"
      style="position: relative; display: block; margin-left: auto; margin-right: auto; max-width: ${presentationWidth}px; ${
      imageCaption ? `` : wrapperStyle
    }"
    >
      ${rawHTML}
    </span>
    `.trim()

    // Wrap in figure and use title as caption
    if (imageCaption) {
      rawHTML = `
  <figure class="gatsby-resp-image-figure" style="${wrapperStyle}">
    ${rawHTML}
    <figcaption class="gatsby-resp-image-figcaption">${imageCaption}</figcaption>
  </figure>
      `.trim()
    }

    return rawHTML
  }

  return { generateImageHTML }
}

// If the image is relative (not hosted elsewhere)
// 1. Find the image file
// 2. Find the image's size
// 3. Filter out any responsive image fluid sizes that are greater than the image's width
// 4. Create the responsive images.
// 5. Set the html w/ aspect ratio helper.
module.exports = async ({
  markdownNode,
  getNode,
  files,
  reporter,
  cache,
  assetsPath,
}) => {
  const options = {
    ...DEFAULT_OPTIONS,
  }

  // const contents = unified()
  //   .use(markdown)
  //   .use(remark2rehype)
  //   .use(replaceGatsbyImage, {
  //     markdownNode,
  //     getNode,
  //     files,
  //     reporter,
  //     cache,
  //     assetsPath,
  //     options,
  //   })
  //   .use(html)
  //   .processSync(markdownNode.md)
  //   .toString()

  // markdownNode.html = contents
  // console.log(markdownNode.html)

  const tree = compiler.mdToAST(markdownNode.md)
  const nodes = []

  visit(
    tree,
    // only visit p tags that contain an img element
    node => node.tagName === "img",
    async node => {
      //TODO detect img in link?
      nodes.push(node)
    }
  )

  const generateImageHTML = replaceGatsbyImage({
    markdownNode,
    getNode,
    files,
    reporter,
    cache,
    options,
    assetsPath,
  }).generateImageHTML

  await Promise.all(
    nodes.map(async node => {
      const html = await generateImageHTML(node, false)
      if (html) {
        node.type = "raw"
        node.value = html
      }
    })
  )

  const content = compiler.toHTML(tree)

  markdownNode.html = content.replace(/(?:\\n|\n)/g, "<br/>")
}
