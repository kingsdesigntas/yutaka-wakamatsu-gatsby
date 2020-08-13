/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import { Box, useTheme } from "@chakra-ui/core"

const Copy = ({ children, ...props }) => {
  const theme = useTheme()

  return (
    <Box
      css={css`
        & > * {
          margin-bottom: ${theme.space["3"]};
          &:last-child {
            margin-bottom: 0;
          }
        }
        ul,
        ol {
          padding-left: 40px;
        }

        h1 {
          font-size: ${theme.fontSizes["4xl"]};
        }
        h2 {
          font-size: ${theme.fontSizes["3xl"]};
        }
        h3 {
          font-size: ${theme.fontSizes["2xl"]};
        }
        h4 {
          font-size: ${theme.fontSizes["xl"]};
        }
        h5 {
          font-size: ${theme.fontSizes["lg"]};
        }
        h6 {
          font-size: ${theme.fontSizes["lg"]};
        }
      `}
      {...props}
    >
      {children}
    </Box>
  )
}
export default Copy
