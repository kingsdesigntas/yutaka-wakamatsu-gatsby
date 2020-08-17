import React from "react"
import TestimonialsPageTemplate from "../templates/TestimonialsPageTemplate"
import { graphql } from "gatsby"

const TestimonialsPage = ({ data }) => {
  const testimonials = data?.testimonials
    ? data.testimonials.edges.map(({ node }) => {
        return node.frontmatter
      })
    : []

  return (
    <TestimonialsPageTemplate
      description={data?.page?.frontmatter?.description}
      title={data?.page?.frontmatter?.title}
      content={data?.page?.frontmatter?.content}
      testimonials={testimonials}
    />
  )
}

export default TestimonialsPage

export const query = graphql`
  query TestimonialsPageQuery {
    page: markdownRemark(
      frontmatter: { templateKey: { eq: "testimonials-page" } }
    ) {
      frontmatter {
        templateKey
        title
        description
        content
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
