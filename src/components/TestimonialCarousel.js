/** @jsx jsx */
import { css, jsx } from "@emotion/core"

//import React from "react"
//import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { MdChevronRight, MdChevronLeft } from "react-icons/md"
import { Carousel, Slide } from "./Carousel"
import { Stack } from "@chakra-ui/core"

const TestimonialCarousel = ({ children }) => {
  return (
    <Carousel
      autoPlay={true}
      showArrows={children.length > 1}
      renderArrowWrapper={({ children }) => (
        <Stack
          position="absolute"
          right="1px"
          bottom="1px"
          isInline
          spacing="1"
          zIndex="10"
        >
          {children}
        </Stack>
      )}
      renderArrow={({ onClick, direction }) => (
        <button
          onClick={onClick}
          css={css`
            font-size: 2rem;
          `}
        >
          {direction === 1 && <MdChevronRight />}
          {direction === -1 && <MdChevronLeft />}
        </button>
      )}
    >
      {children.map((slide, index) => (
        <Slide index={index} key={index}>
          {slide}
        </Slide>
      ))}
    </Carousel>
  )
}
export default TestimonialCarousel
