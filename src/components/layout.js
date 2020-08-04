/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./Header"

import { Global, css } from "@emotion/core"
import { ThemeProvider, CSSReset } from "@chakra-ui/core"
import customTheme from "../theme"
import Footer from "./Footer"

console.log(customTheme)

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <ThemeProvider theme={customTheme}>
        <CSSReset />
        {/*<Global
          styles={css`
            body {
              font-family: "Montserrat", sans-serif;
            }
          `}
        />*/}
        <Header siteTitle={data.site.siteMetadata.title} />
        <main>{children}</main>
        <Footer />
      </ThemeProvider>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
