/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import { useRef, useState, useEffect } from "react"
import Container from "./Container"
import {
  Box,
  Text,
  SimpleGrid,
  Textarea,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/core"
import Button from "./Button"
import useSettings from "../lib/useSettings"
import phoneToLink from "../lib/phoneToLink"
import { MdClose } from "react-icons/md"
import { FaFacebook } from "react-icons/fa"

const Footer = () => {
  const settings = useSettings()

  const inputStyles = {
    bg: "blue.700",
    border: "none",
  }

  const formRef = useRef()

  const [formSending, setFormSending] = useState()
  const [formSent, setFormSent] = useState(null)
  const [formError, setFormError] = useState(null)

  const [isOpen, setIsOpen] = useState(false)

  const onFormSubmit = async e => {
    e.preventDefault()

    setFormSent(false)
    setFormError(false)

    const formData = Array.from(new FormData(formRef.current)).reduce(
      (a, formEntry) => {
        a[formEntry[0]] = formEntry[1]
        return a
      },
      {}
    )

    if (!formData.name || !formData.email || !formData.message) {
      setFormError("Please enter your name, email and a message.")
      return
    }

    const urlEncFormData = Object.keys(formData)
      .map(formDataKey => {
        return `${encodeURIComponent(formDataKey)}=${encodeURIComponent(
          formData[formDataKey]
        )}`
      })
      .join("&")

    setFormSending(true)
    try {
      const resp = await fetch(formRef.current.action, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: urlEncFormData,
      }).then(r => {
        if (r.ok) return r
        throw new Error(r)
      })
      console.log("resp", resp)

      setFormSent(true)
      setFormSending(false)
    } catch (e) {
      console.error(e)
      setFormSending(false)
      setFormError("Something went wrong. Your message was not sent.")
    }
  }
  const handlePopState = e => {
    if (
      window.location.hash === "#contact" ||
      window.location.hash === "#book-now"
    ) {
      setIsOpen(true)
    }
  }

  useEffect(() => {
    window.addEventListener("popstate", handlePopState)
    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [])

  return (
    <footer>
      <Box
        bg="blue.900"
        py={[6, null, 10]}
        color="white"
        textAlign="center"
        style={{
          position: isOpen ? "fixed" : null,
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {isOpen && (
          <Box
            as={"button"}
            onClick={() => setIsOpen(false)}
            fontSize="4xl"
            position="absolute"
            right="1rem"
            top="1rem"
          >
            <MdClose />
          </Box>
        )}
        <Container>
          <Text
            fontWeight="bold"
            fontSize={["xl", "2xl"]}
            mb="3"
            color="blue.50"
          >
            Make a booking
          </Text>
          <Text>
            Request a booking using the form below. I also welcome your feedback
            and questions.
          </Text>
          <SimpleGrid columns={[1, null, 2]} mt="6">
            <Box textAlign="left">
              {formSent ? (
                <Text>
                  Thank you for getting in touch. I will get back to you as soon
                  as possible.
                </Text>
              ) : (
                <form
                  name="footer-contact"
                  method="POST"
                  data-netlify="true"
                  onSubmit={onFormSubmit}
                  ref={formRef}
                >
                  <Stack spacing="3">
                    <Flex mx={-2}>
                      <Box w="50%" px="2">
                        <FormControl>
                          <FormLabel htmlFor="text" fontWeight="bold">
                            Name
                          </FormLabel>
                          <Input
                            type="text"
                            id="name"
                            name="name"
                            isDisabled={formSending}
                            {...inputStyles}
                          />
                        </FormControl>
                      </Box>
                      <Box w="50%" px="2">
                        <FormControl>
                          <FormLabel htmlFor="email" fontWeight="bold">
                            Email
                          </FormLabel>
                          <Input
                            type="email"
                            id="email"
                            name="email"
                            isDisabled={formSending}
                            {...inputStyles}
                          />
                        </FormControl>
                      </Box>
                    </Flex>
                    <FormControl>
                      <FormLabel htmlFor="message" fontWeight="bold">
                        Message
                      </FormLabel>
                      <Textarea
                        id="message"
                        name="message"
                        isDisabled={formSending}
                        {...inputStyles}
                      />
                    </FormControl>
                    <Box textAlign="center" pt="3">
                      <Button
                        variant="outline"
                        variantColor="white"
                        type="submit"
                        isLoading={formSending}
                        loadingText="Submitting"
                      >
                        Send enquiry
                      </Button>
                    </Box>
                  </Stack>
                </form>
              )}
              {!formSent && formError && (
                <Text color="red.700" bg="red.100" p="2" mt="2">
                  {formError}
                </Text>
              )}
            </Box>
            <Box>
              <Box my="10" textAlign="left" maxW="xs" mx="auto">
                <table
                  css={css`
                    td {
                      padding-left: 0.5rem;
                      padding-right: 0.5rem;
                    }
                  `}
                >
                  <tbody>
                    <tr>
                      <td>
                        <strong>Email</strong>
                      </td>
                      <td>
                        <Text
                          as="a"
                          href={`mailto:${settings?.contact?.email}`}
                          whiteSpace="normal"
                          wordBreak="break-word"
                        >
                          {settings?.contact?.email}
                        </Text>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Phone</strong>
                      </td>
                      <td>
                        <a
                          href={`tel:${phoneToLink(settings?.contact?.phone)}`}
                        >
                          {settings?.contact?.phone}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Address</strong>
                      </td>
                      <td>
                        <a
                          href={`https://google.com/maps/dir//${encodeURIComponent(
                            settings?.contact?.address
                          )}`}
                          target="_blank"
                        >
                          {settings?.contact?.address}
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Box>
              <Box my="10" textAlign="left" maxW="xs" mx="auto">
                <Text
                  as="a"
                  href="https://facebook.com/yutakamassagecst"
                  rel="nofollow noreferrer"
                  target="_blank"
                  fontSize="2xl"
                >
                  <FaFacebook />
                </Text>
              </Box>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>
      <Box bg="#012029" py="1" fontSize="sm" color="blue.300">
        <Container>
          <Box textAlign="right">
            © {new Date().getFullYear()}.{" "}
            <Text
              as="a"
              href="https://www.kingsdesign.com.au"
              target="_blank"
              rel="noopener noreferrer"
              textDecoration="underline"
            >
              Web design
            </Text>{" "}
            by KingsDesign
          </Box>
        </Container>
      </Box>
    </footer>
  )
}
export default Footer
