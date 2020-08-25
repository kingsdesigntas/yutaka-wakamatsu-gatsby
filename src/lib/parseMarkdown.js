const remark = require("remark")
const React = require("react")

//const recommended = require("remark-preset-lint-recommended")
//const html = require("remark-html")

// const parseMarkdown = md => {
//   return new Promise((resolve, reject) => {
//     remark()
//       .use(recommended)
//       .use(html)
//       .process(md, function (err, file) {
//         if (err) {
//           return reject(err)
//         }
//         return resolve(String(file))
//       })
//   })
// }

const unified = require("unified")
const markdown = require("remark-parse")
const remark2rehype = require("remark-rehype")
const rehype2react = require("rehype-react")

const processor = unified()
  .use(markdown)
  .use(remark2rehype)
  .use(rehype2react, { createElement: React.createElement })

const parseMarkdown = md => {
  return processor.process(md).then(r => {
    return r.result
  })
}

module.exports = parseMarkdown
