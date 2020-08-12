import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { Box, Flex, Stack, Text } from "@chakra-ui/core"
import Container from "./Container"
import Button from "./Button"
import { MdMenu } from "react-icons/md"
import { customEvent } from "../lib/triggerEvent"

const Header = () => (
  <Box as="header">
    <Container px={[0, , , 2]}>
      <Flex justifyContent={[, , , "flex-end"]}>
        <Stack isInline align="center">
          <Button
            as="a"
            variantColor="red"
            href="#"
            onClick={e => {
              e.preventDefault()
              alert("this hasn't been set!")
            }}
            size="sm"
            py={[2, , 4]}
            height="auto"
            fontWeight="bold"
          >
            Call 0412 TODO
          </Button>
          <Box>
            <Button
              variant="link"
              as="a"
              href="#"
              onClick={e => {
                e.preventDefault()
                alert("this hasn't been set!")
              }}
              size="sm"
              fontWeight="bold"
              height="auto"
            >
              Email email@email.com
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
        pb={[3, , 6]}
      >
        {/* Brand */}
        <Box maxW="sm">
          <Link to="/">
            <Text
              fontSize={["xl", , "2xl", "4xl"]}
              color="blue.500"
              lineHeight="1.1"
            >
              Yutaka Wakamatsu
            </Text>
            <Text fontSize={["xl", , "2xl", "4xl"]} lineHeight="1.1">
              CranioSacral Therapy & Remedial Massage
            </Text>
          </Link>
        </Box>
        {/* Secondary Nav */}
        <Box display={["none", , "block"]}>
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
    <Box bg="blue.500" py={[2, , 6]}>
      <Container>
        {/* Mobile nav toggle */}
        <Box
          as="button"
          display={["block", , "none"]}
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
          spacing={[3, , , 10]}
          display={["none", , "block"]}
        >
          <Button variantColor="red" as={Link} to={"/"} px={[2, , , 6]}>
            Book now
          </Button>
          <Button
            variant="link"
            as={Link}
            to="/"
            variantColor="white"
            fontWeight="bold"
            fontSize={["sm", , , "md"]}
          >
            CranioSacral Therapy (CST)
          </Button>
          <Button
            variant="link"
            as={Link}
            to="/"
            variantColor="white"
            fontWeight="bold"
            fontSize={["sm", , , "md"]}
          >
            CST Study Group
          </Button>
          <Button
            variant="link"
            as={Link}
            to="/"
            variantColor="white"
            fontWeight="bold"
            fontSize={["sm", , , "md"]}
          >
            Remedial Massage
          </Button>
          <Button
            variant="link"
            as={Link}
            to="/"
            variantColor="white"
            fontWeight="bold"
            fontSize={["sm", , , "md"]}
          >
            Still Point Inducer
          </Button>
        </Stack>
      </Container>
    </Box>
  </Box>
)

export default Header
