/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import React from "react"
import { Box, useTheme } from "@chakra-ui/core"

const Copy = ({ children, ...props }) => {
  const theme = useTheme()

  return (
    <Box
      css={css`
        p {
          margin-bottom: ${theme.space["3"]};
          &:last-child {
            margin-bottom: 0;
          }
        }
      `}
      {...props}
    >
      {children}
    </Box>
  )
}
export default Copy
