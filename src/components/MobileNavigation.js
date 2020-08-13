import React, { useEffect, useState, useRef, useCallback } from "react"
import { Box, Stack, Button, Flex } from "@chakra-ui/core"
import { Link } from "gatsby"
import { MdClose } from "react-icons/md"
import useSettings from "../lib/useSettings"
import phoneToLink from "../lib/phoneToLink"

const MobileNavigation = () => {
  const settings = useSettings()

  const hash = "#mobile-navigation"

  const [isOpen, setIsOpen] = useState(false)
  const isOpenRef = useRef()
  const linksRef = useRef()

  const handleEventOpen = useCallback(
    e => {
      if (isOpen) return
      setIsOpen(true)

      window.history.pushState({}, "", hash)
    },
    [isOpen]
  )

  const handlePopState = e => {
    if (window.location.hash !== hash && isOpenRef.current) {
      setIsOpen(false)
    }
  }

  const handleLinkClick = e => {
    setIsOpen(false)
  }

  useEffect(() => {
    document.addEventListener("mobile-nav-open", handleEventOpen)
    window.addEventListener("popstate", handlePopState)
  }, [handleEventOpen])

  useEffect(() => {
    if (!isOpen && window.location.hash === hash) {
      window.history.back()
    }
    isOpenRef.current = isOpen

    if (linksRef && linksRef.current) {
      if (isOpen) {
        linksRef.current.addEventListener("click", handleLinkClick)
      } else {
        linksRef.current.removeEventListener("click", handleLinkClick)
      }
    }
  }, [isOpen])

  if (!isOpen) return null
  return (
    <Box
      position="fixed"
      zIndex="1000"
      left="0"
      top="0"
      width="100%"
      height="100%"
      bg="blue.500"
      color="white"
      px="4"
      py="6"
      pt="12"
    >
      <Button
        variant="ghost"
        position="absolute"
        right="1px"
        fontSize="2xl"
        top="1px"
        color="white"
        onClick={() => setIsOpen(false)}
      >
        <MdClose />
      </Button>
      <Box overflowY="auto" overflowX="hidden" ref={linksRef}>
        <Stack spacing="4">
          <Button variantColor="red" as={Link} to={"/"} px={[2, null, null, 6]}>
            Book now
          </Button>
          <Flex mx={-2}>
            <Box px="2" w="50%">
              <Button
                w="100%"
                as="a"
                variant="outline"
                variantColor="white"
                href={`tel:${phoneToLink(settings?.contact?.phone)}`}
                size="sm"
                py={2}
                height="auto"
                fontWeight="bold"
              >
                Call
              </Button>
            </Box>
            <Box px="2" w="50%">
              <Button
                w="100%"
                as="a"
                variant="outline"
                variantColor="white"
                href={`mailto:${settings?.contact?.email}`}
                size="sm"
                py={2}
                height="auto"
                fontWeight="bold"
              >
                Email
              </Button>
            </Box>
          </Flex>
          <Button
            justifyContent="flex-start"
            variant="link"
            as={Link}
            to="/"
            variantColor="white"
            fontWeight="bold"
          >
            CranioSacral Therapy (CST)
          </Button>
          <Button
            justifyContent="flex-start"
            variant="link"
            as={Link}
            to="/"
            variantColor="white"
            fontWeight="bold"
          >
            CST Study Group
          </Button>
          <Button
            justifyContent="flex-start"
            variant="link"
            as={Link}
            to="/"
            variantColor="white"
            fontWeight="bold"
          >
            Remedial Massage
          </Button>
          <Button
            justifyContent="flex-start"
            variant="link"
            as={Link}
            to="/"
            variantColor="white"
            fontWeight="bold"
          >
            Still Point Inducer
          </Button>
          <Button
            justifyContent="flex-start"
            variant="link"
            as={Link}
            to="/"
            variantColor="white"
            fontWeight="normal"
          >
            About Yutaka
          </Button>
          <Button
            justifyContent="flex-start"
            variant="link"
            as={Link}
            to="/"
            variantColor="white"
            fontWeight="normal"
          >
            Testimonials
          </Button>
          <Button
            justifyContent="flex-start"
            variant="link"
            as={Link}
            to="/"
            variantColor="white"
            fontWeight="normal"
          >
            Contact
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}
export default MobileNavigation
