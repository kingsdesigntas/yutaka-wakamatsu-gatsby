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
  return (
    <IndexPageTemplate
      hero={hero}
      description={data?.indexPage?.frontmatter?.description}
      title={data?.indexPage?.frontmatter?.title}
      main={main}
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
        sections: {
          
        }
      }
    }
  }
`
