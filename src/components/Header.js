import { Link, useStaticQuery, graphql } from "gatsby"
//import PropTypes from "prop-types"
import React from "react"
import { Box, Flex, Stack, Text } from "@chakra-ui/core"
import Container from "./Container"
import Button from "./Button"
import { MdMenu } from "react-icons/md"
import { customEvent } from "../lib/triggerEvent"
import Img from "gatsby-image"

import useSettings from "../lib/useSettings"
import phoneToLink from "../lib/phoneToLink"
import mapLink from "../lib/mapLink"

const Header = () => {
  const settings = useSettings()

  const data = useStaticQuery(graphql`
    query HeaderQuery {
      cst_logo: file(
        sourceInstanceName: { eq: "uploads" }
        name: { eq: "cst_logo" }
      ) {
        childImageSharp {
          fluid(maxWidth: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }

      massage_mytotherapy_logo: file(
        sourceInstanceName: { eq: "uploads" }
        name: { eq: "massage_mytotherapy_logo" }
      ) {
        childImageSharp {
          fluid(maxWidth: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Box as="header">
      <Container px={[0, null, null, 2]}>
        <Flex justifyContent={[null, null, null, "flex-end"]}>
          <Stack isInline align="center">
            <Button
              as="a"
              variantColor="red"
              href={`tel:${phoneToLink(settings?.contact.phone)}`}
              onClick={e => {
                e.preventDefault()
                alert("this hasn't been set!")
              }}
              size="sm"
              fontSize={["xs", null, "sm"]}
              py={[2, null, 4]}
              height="auto"
              fontWeight="bold"
              whiteSpace="normal"
              wordBreak="break-word"
            >
              Call {settings?.contact?.phone}
            </Button>
            <Box>
              <Button
                variant="link"
                as="a"
                href={`mailto:${settings?.contact?.email}`}
                size="sm"
                fontSize={["xs", null, "sm"]}
                fontWeight="bold"
                height="auto"
                whiteSpace="normal"
                wordBreak="break-word"
              >
                Email{" "}
                <Text as="span" display={["none", null, "inline"]}>
                  {settings?.contact?.email}
                </Text>
              </Button>
            </Box>
          </Stack>
        </Flex>
      </Container>
      <Container>
        <Flex
          justifyContent="space-between"
          align="center"
          pt={[3, 3, 3, 0]}
          pb={[3, null, 6]}
        >
          {/* Brand */}
          <Box maxW="sm">
            <Link to="/">
              <Text
                fontSize={["xl", null, "2xl", "3xl"]}
                color="blue.500"
                lineHeight="1.1"
                fontWeight="bold"
              >
                Yutaka Wakamatsu
              </Text>
              <Text fontSize={["xl", null, "2xl", "3xl"]} lineHeight="1.1">
                Hobart CranioSacral &amp; Remedial Massage
              </Text>
            </Link>
          </Box>
          {/* Logos */}
          <Flex
            maxW="sm"
            display={["none", null, null, "flex"]}
            alignItems="center"
          >
            {data?.cst_logo?.childImageSharp?.fluid && (
              <Box width="6rem" px="2">
                <Img fluid={data.cst_logo.childImageSharp.fluid} />
              </Box>
            )}
            {data?.massage_mytotherapy_logo?.childImageSharp?.fluid && (
              <Box width="6rem" px="2">
                <Img
                  fluid={data.massage_mytotherapy_logo.childImageSharp.fluid}
                />
              </Box>
            )}
          </Flex>
          {/* Secondary Nav */}
          <Box display={["none", null, "block"]}>
            <Stack as="nav" isInline spacing="3">
              {settings?.menu?.secondary?.length &&
                settings.menu.secondary.map(({ link }, index) => (
                  <Button {...mapLink(link)} key={index} variant="link">
                    {link.title}
                  </Button>
                ))}
            </Stack>
          </Box>
        </Flex>
      </Container>
      <Box bg="blue.500" py={[2, null, 6]}>
        <Container>
          {/* Mobile nav toggle */}
          <Box
            as="button"
            display={["block", null, "none"]}
            color="white"
            onClick={() => customEvent(document, "mobile-nav-open")}
          >
            <Stack as="span" isInline spacing="3" align="center">
              <Text fontSize="4xl" as="span">
                <MdMenu />
              </Text>
              <Text fontWeight="bold" as="span">
                Menu
              </Text>
            </Stack>
          </Box>
          <Stack
            as="nav"
            isInline
            spacing={[3, null, null, 10]}
            display={["none", null, "block"]}
          >
            <Button
              variantColor="red"
              as={"a"}
              href="#book-now"
              px={[2, null, null, 6]}
            >
              Book now
            </Button>
            {settings?.menu?.primary?.length &&
              settings.menu.primary.map(({ link }, index) => (
                <Button
                  key={index}
                  variant="link"
                  {...mapLink(link)}
                  variantColor="white"
                  fontWeight="bold"
                  fontSize={["sm", null, null, "md"]}
                >
                  {link.title}
                </Button>
              ))}
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}

export default Header
