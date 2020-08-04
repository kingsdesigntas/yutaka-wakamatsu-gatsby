import { Button as ChakraButton, Box } from "@chakra-ui/core"
import React, { forwardRef } from "react"

const Button = forwardRef(
  ({ children, variant = null, variantColor = null, ...props }, ref) => {
    let variantStyles = {
      cursor: "pointer",
    }
    if (!variant) {
      const base = variantColor ? variantColor : "red"
      variantStyles = {
        ...variantStyles,
        bg: `${base}.600`,
        color: "white",
        _hover: {
          bg: `${base}.700`,
        },
        _active: {
          bg: `${base}.800`,
        },
      }
    }
    if (variant === "outline") {
      const base = variantColor ? variantColor : "red"
      variantStyles = {
        ...variantStyles,
        bg: `transparent`,
        color: `${base}.600`,
        borderColor: `${base}.600`,
        _hover: {
          bg: `${base}.50`,
          color: `${base}.600`,
        },
        _active: {
          bg: `${base}.100`,
          color: `${base}.600`,
        },
      }
    }
    if (variant === "link") {
      variantStyles.fontWeight = "normal"
      if (variantColor === "white") {
        variantStyles.color = "white"
      }
      if (!variantColor) {
        variantStyles.color = "gray.700"
      }
    }

    return (
      <ChakraButton
        ref={ref}
        borderRadius="0"
        variant={variant}
        {...variantStyles}
        {...props}
      >
        {children}
      </ChakraButton>
    )
  }
)
export default Button
