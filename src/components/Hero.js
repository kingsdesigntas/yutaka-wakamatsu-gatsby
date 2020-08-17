/** @jsx jsx */
import { jsx } from "@emotion/core"
import { Box, Flex, Text, Stack } from "@chakra-ui/core"
import Container from "./Container"
import { Link } from "gatsby"
import Button from "./Button"

const Hero = ({ backgroundImage, title, text = null, actions = [] }) => {
  return (
    <Box position="relative" py={[null, null, "32"]}>
      {/* Background */}
      <Box
        position={["relative", null, "absolute"]}
        left="0"
        top="0"
        w="100%"
        h={["200px", null, "100%"]}
        backgroundImage={`url(${
          backgroundImage?.childImageSharp
            ? backgroundImage?.childImageSharp?.fluid?.src
            : backgroundImage?.url
        })`}
        backgroundSize="cover"
        backgroundPosition="center center"
      ></Box>
      <Container position="relative" px={[0, null, 2]}>
        <Flex align="center" maxWidth={["100%", null, "50%"]}>
          <Box
            bg={["blue.500", null, "transparent"]}
            px={["3", null, 0]}
            py={["4", null, 0]}
          >
            <Box
              bg={["blue.500", null, "blue.500-75"]}
              px={[0, null, 3]}
              py={[0, null, 4]}
            >
              <Stack spacing="3">
                <Text
                  color="white"
                  fontWeight="bold"
                  fontSize={["xl", null, "2xl", "3xl", "4xl"]}
                >
                  {title}
                </Text>
                {text?.length && (
                  <Text color="white" fontSize={[null, null, "lg"]}>
                    {text}
                  </Text>
                )}
              </Stack>
            </Box>
            {!!actions?.length && (
              <Box pt="6">
                <Stack isInline spacing="5">
                  {actions.map((action, index) => (
                    <Button
                      key={index}
                      as={Link}
                      to={action.url}
                      px="6"
                      variantColor={
                        action.variant === "secondary" ? "blue" : "red"
                      }
                    >
                      {action.title}
                    </Button>
                  ))}
                </Stack>
              </Box>
            )}
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}
export default Hero
