import React from "react"
import IndexPageTemplate from "../templates/IndexPageTemplate"
import { graphql } from "gatsby"

const IndexPage = ({ data }) => {
  const hero = data?.indexPage
    ? {
        ...data.indexPage.frontmatter.hero,
      }
    : {}
  return (
    <IndexPageTemplate hero={hero} title={data.indexPage.frontmatter.title} />
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
      }
    }
  }
`
