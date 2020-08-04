/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import React from "react"
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
  TextArea,
  Stack,
} from "@chakra-ui/core"
import Button from "./Button"

const Footer = () => {
  const inputStyles = {
    bg: "blue.700",
    border: "none",
  }

  return (
    <footer>
      <Box bg="blue.900" py={[6, , 10]} color="white" textAlign="center">
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
          <SimpleGrid columns={[1, , 2]} mt="6">
            <Box textAlign="left">
              <form>
                <Stack spacing="3">
                  <Flex mx={-2}>
                    <Box w="50%" px="2">
                      <FormControl>
                        <FormLabel htmlFor="text" fontWeight="bold">
                          Name
                        </FormLabel>
                        <Input type="text" id="name" {...inputStyles} />
                      </FormControl>
                    </Box>
                    <Box w="50%" px="2">
                      <FormControl>
                        <FormLabel htmlFor="email" fontWeight="bold">
                          Email
                        </FormLabel>
                        <Input type="email" id="email" {...inputStyles} />
                      </FormControl>
                    </Box>
                  </Flex>
                  <FormControl>
                    <FormLabel htmlFor="message" fontWeight="bold">
                      Message
                    </FormLabel>
                    <Textarea id="message" {...inputStyles} />
                  </FormControl>
                  <Box textAlign="center" pt="3">
                    <Button variant="outline" variantColor="white">
                      Send enquiry
                    </Button>
                  </Box>
                </Stack>
              </form>
            </Box>
            <Box>
              <Box py="10" textAlign="left" maxW="xs" mx="auto">
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
                        <a
                          href="#"
                          onClick={e => {
                            e.preventDefault()
                            alert("not yet implemented!")
                          }}
                        >
                          email@example.com
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Phone</strong>
                      </td>
                      <td>
                        <a
                          href="#"
                          onClick={e => {
                            e.preventDefault()
                            alert("not yet implemented!")
                          }}
                        >
                          (03) 62 123 456
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Address</strong>
                      </td>
                      <td>
                        <a
                          href="#"
                          onClick={e => {
                            e.preventDefault()
                            alert("not yet implemented!")
                          }}
                        >
                          1234 Somewhere Rd, Hobart, TAS 7000
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
