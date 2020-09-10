import React from "react"

import PageTemplate from "../templates/PageTemplate"
import { graphql } from "gatsby"

const PageQueryTemplate = ({ data }) => {
  return (
    <PageTemplate
      description={data?.page?.frontmatter?.description}
      title={data?.page?.frontmatter?.title}
      content={data?.page?.frontmatter?.content}
      heroimage={data?.page?.frontmatter?.heroimage}
      image={data?.page?.frontmatter?.image}
    />
  )
}

export default PageQueryTemplate

export const query = graphql`
  query PageQuery($slug: String!) {
    page: markdownRemark(
      fields: { sourceInstanceName: { eq: "pages" }, slug: { eq: $slug } }
    ) {
      frontmatter {
        content {
          html
        }
        description
        title
        heroimage {
          childImageSharp {
            fluid(maxWidth: 2000) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        image {
          childImageSharp {
            fluid(maxWidth: 500) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
