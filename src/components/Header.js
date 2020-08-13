import { Link } from "gatsby"
//import PropTypes from "prop-types"
import React from "react"
import { Box, Flex, Stack, Text } from "@chakra-ui/core"
import Container from "./Container"
import Button from "./Button"
import { MdMenu } from "react-icons/md"
import { customEvent } from "../lib/triggerEvent"

import useSettings from "../lib/useSettings"
import phoneToLink from "../lib/phoneToLink"

const Header = () => {
  const settings = useSettings()

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
              py={[2, null, 4]}
              height="auto"
              fontWeight="bold"
            >
              Call {settings?.contact?.phone}
            </Button>
            <Box>
              <Button
                variant="link"
                as="a"
                href={`mailto:${settings?.contact?.email}`}
                size="sm"
                fontWeight="bold"
                height="auto"
              >
                Email {settings?.contact?.email}
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
                fontSize={["xl", null, "2xl", "4xl"]}
                color="blue.500"
                lineHeight="1.1"
              >
                Yutaka Wakamatsu
              </Text>
              <Text fontSize={["xl", null, "2xl", "4xl"]} lineHeight="1.1">
                CranioSacral Therapy & Remedial Massage
              </Text>
            </Link>
          </Box>
          {/* Secondary Nav */}
          <Box display={["none", null, "block"]}>
            <Stack as="nav" isInline spacing="3">
              <Button as={Link} variant="link" to="/">
                About Yutaka
              </Button>
              <Button as={Link} variant="link" to="/">
                Testimonials
              </Button>
              <Button as={Link} variant="link" to="/">
                Contact
              </Button>
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
              as={Link}
              to={"/"}
              px={[2, null, null, 6]}
            >
              Book now
            </Button>
            <Button
              variant="link"
              as={Link}
              to="/"
              variantColor="white"
              fontWeight="bold"
              fontSize={["sm", null, null, "md"]}
            >
              CranioSacral Therapy (CST)
            </Button>
            <Button
              variant="link"
              as={Link}
              to="/"
              variantColor="white"
              fontWeight="bold"
              fontSize={["sm", null, null, "md"]}
            >
              CST Study Group
            </Button>
            <Button
              variant="link"
              as={Link}
              to="/"
              variantColor="white"
              fontWeight="bold"
              fontSize={["sm", null, null, "md"]}
            >
              Remedial Massage
            </Button>
            <Button
              variant="link"
              as={Link}
              to="/"
              variantColor="white"
              fontWeight="bold"
              fontSize={["sm", null, null, "md"]}
            >
              Still Point Inducer
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}

export default Header
