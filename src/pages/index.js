import React from "react"
import IndexPageTemplate from "../templates/IndexPageTemplate"
import { graphql } from "gatsby"

const IndexPage = ({ data }) => {
  const hero = data?.indexPage?.frontmatter?.hero
    ? data.indexPage.frontmatter.hero
    : {}

  const main = data?.indexPage?.frontmatter?.main
    ? data.indexPage.frontmatter.main
    : {}

  const sections = data?.indexPage?.frontmatter?.sections

  const testimonials = data?.testimonials
    ? data.testimonials.edges.map(({ node }) => {
        return node.frontmatter
      })
    : []

  return (
    <IndexPageTemplate
      hero={hero}
      description={data?.indexPage?.frontmatter?.description}
      title={data?.indexPage?.frontmatter?.title}
      main={main}
      sections={sections}
      testimonials={testimonials}
    />
  )
}

export default IndexPage

export const query = graphql`
  query IndexPageQuery {
    indexPage: markdownRemark(
      frontmatter: { templateKey: { eq: "index-page" } }
    ) {
      frontmatter {
        templateKey
        title
        description
        hero {
          text
          title
          image {
            childImageSharp {
              fluid(maxWidth: 2000) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        main {
          title
          content
          image {
            childImageSharp {
              fluid(maxWidth: 350) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        sections {
          actions {
            title
            url
            collection
            slug
          }
          content
          title
          image {
            childImageSharp {
              fluid(maxWidth: 350) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }

    testimonials: allMarkdownRemark(
      filter: { fields: { sourceInstanceName: { eq: "testimonials" } } }
    ) {
      edges {
        node {
          frontmatter {
            text
            name
          }
        }
      }
    }
  }
`
