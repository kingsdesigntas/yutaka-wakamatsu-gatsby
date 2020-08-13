const _ = require("lodash")
const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")
const { fmImagesToRelative } = require("gatsby-remark-relative-images")

const parseMarkdown = require("./src/lib/parseMarkdown")

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
      component: path.resolve(`src/templates/PageTemplate.js`),
      context: {
        id,
        slug,
      },
    })
  })
}

exports.onCreateNode = async ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })

    if (node?.frontmatter?.main?.content) {
      node.frontmatter.main.content = await parseMarkdown(
        node.frontmatter.main.content
      )
    }
  }
}
