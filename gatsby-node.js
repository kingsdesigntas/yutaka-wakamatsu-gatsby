const _ = require("lodash")
const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")
const { fmImagesToRelative } = require("gatsby-remark-relative-images")
const { get, set } = require("lodash")

const parseMarkdown = require("./src/lib/parseMarkdown")
const frontmatterImages = require("./frontmatterImages")

const remark = require("remark")
const remarkHTML = require("remark-html")

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMarkdownRemark(
        filter: { fields: { sourceInstanceName: { eq: "pages" } } }
        limit: 1000
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  const pages = result.data.allMarkdownRemark.edges

  pages.forEach(({ node }) => {
    const { id } = node
    const { slug } = node.fields
    createPage({
      path: slug,
      component: path.resolve(`src/query_templates/page.js`),
      context: {
        id,
        slug,
      },
    })
  })
}

function createFrontmatterContentNode(
  node,
  path,
  { createNodeId, createNode, createContentDigest }
) {
  const md = get(node, path)

  const html = remark().use(remarkHTML).processSync(md).toString()

  const nodeContent = {
    md,
    html,
  }

  const frontmatterContentNode = {
    id: createNodeId(`${node.id} ${path} >>> MarkdownRemark`),
    children: [],
    parent: node.id,
    internal: {
      contentDigest: createContentDigest(nodeContent),
      type: `FrontmatterContent`,
    },
    ...nodeContent,
  }

  createNode(frontmatterContentNode)

  set(node, path + "___NODE", frontmatterContentNode.id)
}

exports.onCreateNode = async ({
  node,
  actions,
  getNode,
  createNodeId,
  createContentDigest,
  getNodesByType,
  reporter,
  cache,
}) => {
  const { createNodeField, createNode } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })

    // if (
    //   node.frontmatter &&
    //   node.frontmatter.main &&
    //   node.frontmatter.main.content
    // ) {
    //   node.frontmatter.main.content = await parseMarkdown(
    //     node.frontmatter.main.content
    //   )
    // }

    if (node.frontmatter && node.frontmatter.content) {
      createFrontmatterContentNode(node, "frontmatter.content", {
        createNodeId,
        createNode,
        createContentDigest,
      })
      //  node.frontmatter.content = await parseMarkdown(node.frontmatter.content)
    }
  }

  if (node.internal.type === `FrontmatterContent`) {
    const files = getNodesByType(`File`)
    const r = await frontmatterImages({
      getNode,
      files,
      markdownNode: node,
      reporter,
      cache,
      assetsPath: path.join(process.cwd(), "static"),
    })
  }
}

//Make sure settings are available
exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes, createFieldExtension } = actions

  const typeDefs = [
    `type MarkdownRemarkFrontmatterPrimaryLink {
      collection: String
      url: String
      title: String
      slug: String
     }`,
    `type MarkdownRemarkFrontmatterSecondaryLink {
      collection: String
      url: String
      title: String
      slug: String
     }`,
    // `type MarkdownRemarkFrontmatter {
    //    image: File
    //    heroimage: File
    //  }`,
    `type MarkdownRemarkFrontmatterSectionsActions {
      title: String
      url: String
      collection: String
      slug: String
    }`,
    `type MarkdownRemarkFrontmatterHero {
      actions: [MarkdownRemarkFrontmatterSectionsActions]
      text: String
      title: String
    }`,
  ]

  createTypes(typeDefs)
}
