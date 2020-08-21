/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { Box, Flex, Text, Stack } from "@chakra-ui/core"
import Container from "./Container"
import { Link } from "gatsby"
import Button from "./Button"

import { Carousel } from "react-responsive-carousel"

const HeroCarousel = ({ slides }) => {
  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      showIndicators={false}
      swipeable={true}
      autoPlay={true}
      css={css`
        outline: none;
        .carousel {
          position: relative;
          width: 100%;
        }
        .carousel-slider {
          position: relative;
          margin: 0;
          overflow: hidden;
          padding-bottom: 2rem;
        }
        .slider-wrapper {
          overflow: hidden;
          margin: auto;
          width: 100%;
          transition: height 0.15s ease-in;
        }
        .slider {
          margin: 0;
          padding: 0;
          position: relative;
          list-style: none;
          width: 100%;
          -ms-box-orient: horizontal;
          display: -webkit-box;
          display: -moz-box;
          display: -ms-flexbox;
          display: -moz-flex;
          display: -webkit-flex;
          display: flex;

          .slide {
            min-width: 100%;
            margin: 0;
            position: relative;
            text-align: center;
            flex-direction: column;
            flex-flow: column;
            & > * {
              pointer-events: none;
            }
          }
        }
      `}
    >
      {slides.map((slide, index) => (
        <HeroSingle key={index} {...slide} />
      ))}
    </Carousel>
  )
}

export const HeroSingle = ({
  backgroundImage,
  title,
  text = null,
  actions = [],
}) => {
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

const Hero = ({ slides = [] }) => {
  if (!slides.length) return null

  if (slides.length === 1) return <HeroSingle {...slides[0]} />

  return <HeroCarousel slides={slides} />
}
export default Hero
