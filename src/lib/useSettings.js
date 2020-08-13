import { useStaticQuery, graphql } from "gatsby"

const useSettings = () => {
  const data = useStaticQuery(graphql`
    query SettingsQuery {
      contact: markdownRemark(
        fields: { sourceInstanceName: { eq: "settings" } }
        frontmatter: { templateKey: { eq: "contact" } }
      ) {
        frontmatter {
          address
          email
          phone
        }
      }

      menu: markdownRemark(
        fields: { sourceInstanceName: { eq: "settings" } }
        frontmatter: { templateKey: { eq: "menu" } }
      ) {
        frontmatter {
          primary {
            link {
              collection
              slug
              title
              url
            }
          }
          secondary {
            link {
              collection
              slug
              title
              url
            }
          }
        }
      }
    }
  `)

  return {
    contact: data?.contact?.frontmatter ? data.contact.frontmatter : null,
  }
}

export default useSettings
