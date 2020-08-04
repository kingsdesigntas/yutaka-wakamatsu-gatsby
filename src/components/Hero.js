/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import React from "react"
import { Box, Flex, Text, Stack } from "@chakra-ui/core"
import Container from "./Container"
import { Link } from "gatsby"
import Button from "./Button"

const Hero = ({ backgroundImage, title, text = null, actions = [] }) => {
  /*const imageSources = backgroundImage?.childImageSharp?.fluid?.srcSet
    .split(",")
    .map(str => {
      const parts = str.split(" ")
      const w = parts[1].match(/(\d+)/)
      return { src: parts[0], w: w[1] }
    })

  const backgroundImageCss = imageSources.reduce((a, source, index) => {
    //if (index === 0) return `background-image: url(${source.src});`
    return `${a}\n@media (min-width: ${source.w}px) {
      background-image: url(${source.src});
    }`
  }, "")

  {/*css={css`
        ${backgroundImageCss}
      `}*
  */

  return (
    <Box position="relative" py={[, , "32"]}>
      {/* Background */}
      <Box
        position={["relative", , "absolute"]}
        left="0"
        top="0"
        w="100%"
        h={["200px", , "100%"]}
        backgroundImage={`url(${backgroundImage?.childImageSharp?.fluid?.src})`}
        backgroundSize="cover"
        backgroundPosition="center center"
      ></Box>
      <Container position="relative" px={[0, , 2]}>
        <Flex align="center" maxWidth={["100%", , "50%"]}>
          <Box
            bg={["blue.500", , "transparent"]}
            px={["3", , 0]}
            py={["4", , 0]}
          >
            <Box bg={["blue.500", , "blue.500-75"]} px={[0, , 3]} py={[0, , 4]}>
              <Stack spacing="3">
                <Text
                  color="white"
                  fontWeight="bold"
                  fontSize={["xl", , "2xl", "3xl", "4xl"]}
                >
                  {title}
                </Text>
                {text?.length && (
                  <Text color="white" fontSize={[, , "lg"]}>
                    {text}
                  </Text>
                )}
              </Stack>
            </Box>
            {actions?.length && (
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
