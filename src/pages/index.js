import React from "react"
import IndexPageTemplate from "../templates/IndexPageTemplate"
import { graphql } from "gatsby"

const IndexPage = ({ data }) => {
  return <IndexPageTemplate hero={{ image: data?.heroImage }} />
}

export default IndexPage

export const query = graphql`
  query {
    heroImage: file(relativePath: { eq: "Foto_099.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 2000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
