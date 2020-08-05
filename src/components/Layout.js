/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"

import Header from "./Header"

import { Global, css } from "@emotion/core"
import { ThemeProvider, CSSReset, LightMode } from "@chakra-ui/core"
import customTheme from "../theme"
import Footer from "./Footer"

console.log(customTheme)

const Layout = ({ children, isPreview = false }) => {
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
        <LightMode>
          {!isPreview && <Header siteTitle={"Yutaka Wakamatsu"} />}
          <main>{children}</main>
          {!isPreview && <Footer />}
        </LightMode>
      </ThemeProvider>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
