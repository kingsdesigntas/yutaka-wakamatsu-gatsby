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
      component: path.resolve(`src/query_templates/page.js`),
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

//Make sure settings are available
exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes, createFieldExtension } = actions

  const typeDefs = [
    `type MarkdownRemarkFrontmatterSecondaryLink implements Node {
      collection: String
      url: String
      title: String
      slug: String
     }`,

    // schema.buildObjectType({
    //   name: "sanity_category",
    //   fields: {
    //     color: { type: "String" },
    //     color_custom: {
    //       type: "sanity_categoryColor_custom",
    //       fields: { hex: "String" },
    //     },
    //     description: { type: "String" },
    //     posts: {
    //       type: "[sanity_post]",
    //       resolve: async (source, args, context, info) => {
    //         const posts = await context.nodeModel.runQuery({
    //           query: {
    //             filter: {
    //               categories: { elemMatch: { id: { eq: source.id } } },
    //             },
    //           },
    //           type: "sanity_post",
    //         })

    //         return posts && posts.length ? posts : []
    //       },
    //     },
    //   },
    // }),
  ]

  //createTypes(typeDefs)
}
