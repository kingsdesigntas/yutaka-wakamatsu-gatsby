/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { Box, Flex, Text, Stack } from "@chakra-ui/core"
import Container from "./Container"
import { Link } from "gatsby"
import Button from "./Button"

import { Carousel } from "react-responsive-carousel"
import mapLink from "../lib/mapLink"

const HeroCarousel = ({ slides }) => {
  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      showIndicators={true}
      swipeable={true}
      autoPlay={true}
      renderArrowNext={() => null}
      renderArrowPrev={() => null}
      renderIndicator={(onClick, isActive) => (
        <li>
          <Box
            display="block"
            as="button"
            onClick={onClick}
            aria-label="Go to this slide"
            rounded="full"
            width="1rem"
            height="1rem"
            bg="white"
            opacity={isActive ? 1 : 0.5}
          />
        </li>
      )}
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
          }
        }
        .control-dots {
          position: absolute;
          bottom: 3rem;
          right: 1rem;
          display: flex;
          list-style: none;
          li {
            padding-left: 0.25rem;
            padding-right: 0.25rem;
          }
        }
      `}
    >
      {slides.map((slide, index) => (
        <HeroSingle key={index} {...slide} isCarousel={true} />
      ))}
    </Carousel>
  )
}

export const HeroSingle = ({
  image,
  title,
  text = null,
  actions = [],
  isCarousel = false,
}) => {
  return (
    <Box
      position="relative"
      py={[null, null, "32"]}
      height={isCarousel ? "100%" : "auto"}
      display={isCarousel ? "flex" : "block"}
      flexDirection="column"
    >
      {/* Background */}
      <Box
        position={["relative", null, "absolute"]}
        left="0"
        top="0"
        w="100%"
        h={["200px", null, "100%"]}
        backgroundImage={`url(${
          image?.childImageSharp
            ? image?.childImageSharp?.fluid?.src
            : image?.url
        })`}
        backgroundSize="cover"
        backgroundPosition="center center"
        flexGrow="1"
      ></Box>
      <Container position="relative" px={[0, null, 2]} width="100%">
        <Flex align="center" maxWidth={["100%", null, "50%"]}>
          <Box
            bg={["blue.500", null, "transparent"]}
            px={["3", null, 0]}
            py={["4", null, 0]}
            w="100%"
            pb={["12", null, 0]}
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
                  {actions.map((action, index) => {
                    const linkProps = mapLink(action)
                    return (
                      <Button
                        key={index}
                        {...linkProps}
                        px="6"
                        variantColor={index === 0 ? "red" : "blue"}
                      >
                        {action.title}
                      </Button>
                    )
                  })}
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
