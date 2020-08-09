const remark = require("remark")
const recommended = require("remark-preset-lint-recommended")
const html = require("remark-html")

const parseMarkdown = md => {
  return new Promise((resolve, reject) => {
    remark()
      .use(recommended)
      .use(html)
      .process(md, function (err, file) {
        if (err) {
          return reject(err)
        }
        return resolve(String(file))
      })
  })
}

module.exports = parseMarkdown
