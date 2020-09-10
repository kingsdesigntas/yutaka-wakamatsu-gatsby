// This is blatantly copied from Framer Motion example:
// https://codesandbox.io/s/framer-motion-image-gallery-pqvx3?fontsize=14&module=%2Fsrc%2FExample.tsx
// and then modified significantly

/** @jsx jsx */
import { jsx } from "@emotion/core"

import React, { useEffect, useRef } from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { wrap } from "@popmotion/popcorn"
import { Box } from "@chakra-ui/core"

const variants = {
  enter: direction => {
    return {
      x: direction > 0 ? 2000 : -2000,
      transition: {
        staggerChildren: 1,
        type: "tween",
        duration: 0.5,
      },
      position: "relative",
    }
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    position: "relative",
    transition: {
      staggerChildren: 1,
      type: "tween",
      duration: 0.5,
    },
  },
  exit: direction => {
    return {
      position: "absolute",
      zIndex: 0,
      x: direction < 0 ? 2000 : -2000,

      transition: {
        staggerChildren: 1,
        type: "tween",
        duration: 0.5,
      },
    }
  },
}

export const Slide = ({ children, index }) => {
  return <>{children}</>
}

export const Carousel = ({
  children,
  renderIndicator: _renderIndicator = null,
  showIndicators = true,
  renderIndicatorWrapper: _renderIndicatorWrapper = null,
  autoPlay = false,
  autoPlayInterval = 3000,
  autoPlayDirection = 1,
  showArrows = false,
}) => {
  const [[page, direction], setPage] = useState([0, 0])
  const [isDragging, setIsDragging] = useState(false)

  const autoPlayTimeout = useRef()

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const slideIndex = wrap(0, children.length, page)

  const pageRef = useRef(slideIndex)

  useEffect(() => {
    pageRef.current = page
  }, [page])

  const paginate = (newDirection, pages = null) => {
    if (!pages) pages = newDirection
    setPage([pageRef.current + pages, newDirection])
  }

  // const handleNavButtonClick = newIndex => {
  //   return e => {
  //     e.preventDefault()
  //     if (slideIndex === newIndex) return
  //     const pages = newIndex - slideIndex
  //     paginate(pages)
  //   }
  // }

  const indicatorOnClick = newIndex => {
    return e => {
      maybeResetAutoPlay()
      e.preventDefault()
      if (slideIndex === newIndex) return
      const pages = newIndex - slideIndex
      paginate(pages)
    }
  }

  const renderIndicator =
    typeof _renderIndicator === "function"
      ? _renderIndicator
      : ({ onClick, isActive, index }) => (
          <button className="carousel-indicator" onClick={onClick} key={index}>
            {index}
          </button>
        )

  const renderIndicatorChildren = () =>
    children.map((slide, index) =>
      renderIndicator({
        onClick: indicatorOnClick(index),
        isActive: slideIndex === index,
        index,
      })
    )

  const renderIndicatorWrapper =
    typeof _renderIndicatorWrapper === "function"
      ? () => _renderIndicatorWrapper({ children: renderIndicatorChildren() })
      : () => {
          return (
            <div className="carousel-indicators">
              {renderIndicatorChildren()}
            </div>
          )
        }

  const maybeResetAutoPlay = () => {
    if (autoPlayTimeout.current) {
      clearTimeout(autoPlayTimeout.current)
      scheduleAutoPlay()
    }
  }

  const onAutoPlay = () => {
    paginate(1)
    scheduleAutoPlay()
  }
  const scheduleAutoPlay = () => {
    autoPlayTimeout.current = setTimeout(onAutoPlay, autoPlayInterval)
  }

  useEffect(() => {
    if (autoPlay !== true) return
    scheduleAutoPlay()
    return () => {
      if (autoPlayTimeout.current) clearTimeout(autoPlayTimeout.current)
    }
  }, [])

  return (
    <Box position="relative" className="carousel">
      <Box
        css={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "@media print": {
            display: "none",
          },
          paddingBottom: "33%",
        }}
      >
        <div
          css={{
            position: "absolute",
            width: "100%",
            height: "100%",
            left: "0",
            top: "0",
          }}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              css={{
                minWidth: "100%",
                width: "100%",
                height: "100%",
              }}
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragStart={e => {
                //Set start of drag so we can differentiate between drag and nav click
                setIsDragging(true)
              }}
              onClick={e => {
                //Prevent navigation if we were dragging
                if (isDragging) {
                  e.preventDefault()
                  return false
                }
              }}
              onDragEnd={(e, { offset, velocity }) => {
                //Hacky way to run this after onClick. It's not foolproof, but it works
                setTimeout(() => {
                  setIsDragging(false)
                })

                const swipe = swipePower(offset.x, velocity.x)

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1)
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1)
                }
              }}
            >
              {children[slideIndex]}
            </motion.div>
          </AnimatePresence>
        </div>
      </Box>

      {showArrows && (
        <Box>
          <Box className="carousel-prev">
            <button onClick={() => paginate(-1)}>Prev</button>
          </Box>
          <Box className="carousel-next">
            <button onClick={() => paginate(1)}>Next</button>
          </Box>
        </Box>
      )}

      {showIndicators === true && renderIndicatorWrapper()}

      {/* Print spport? <Box
        css={{
          display: "none",
          "@media print": {
            display: "block",
          },
        }}
      >
        {children.map((slide, index) => (
          <React.Fragment key={index}>{slide}</React.Fragment>
        ))}
      </Box> */}
    </Box>
  )
}

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity
}
