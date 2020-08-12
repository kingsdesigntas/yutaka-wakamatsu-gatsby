/** @jsx jsx */
import { css, jsx } from "@emotion/core"

import React from "react"
//import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { Carousel } from "react-responsive-carousel"
import { MdChevronRight, MdChevronLeft } from "react-icons/md"

const TestimonialCarousel = ({ children }) => {
  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      showIndicators={false}
      swipeable={true}
      autoPlay={true}
      renderArrowNext={onClick => (
        <button
          onClick={onClick}
          css={css`
            position: absolute;
            right: 1px;
            bottom: 1px;
            font-size: 2rem;
          `}
        >
          <MdChevronRight />
        </button>
      )}
      renderArrowPrev={onClick => (
        <button
          onClick={onClick}
          css={css`
            position: absolute;
            right: calc(2rem + 1px);
            bottom: 1px;
            font-size: 2rem;
          `}
        >
          <MdChevronLeft />
        </button>
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
            & > * {
              pointer-events: none;
            }
          }
        }
      `}
    >
      {children}
    </Carousel>
  )
}
export default TestimonialCarousel
