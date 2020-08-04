import { theme } from "@chakra-ui/core"

// Let's say you want to add custom colors
const customTheme = {
  ...theme,
  fonts: {
    body: `"Montserrat", apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    heading: `"Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
  },
  colors: {
    ...theme.colors,
    red: {
      50: "#fbecef",
      100: "#f6cfd6",
      200: "#e39ea3",
      300: "#d57a80",
      400: "#df5e62",
      500: "#e4514e",
      600: "#d5494b",
      700: "#c34144",
      800: "#b53b3e",
      900: "#a53434",
    },
    blue: {
      50: "#d6f3ff",
      100: "#b5deee",
      200: "#97c4d8",
      300: "#75aac1",
      400: "#5c96af",
      500: "#3f839e",
      600: "#32748c",
      700: "#236076",
      800: "#144c60",
      900: "#003748",
      "500-10": "#3f839e19",
      "500-75": "#3f839ebe",
    },
    gray: {
      50: "#efefef",
      100: "#d4d8db",
      200: "#b7bec5",
      300: "#99a5af",
      400: "#83919e",
      500: "#6c7e8e",
      600: "#5f6f7d",
      700: "#4f5b66",
      800: "#404850",
      900: "#2d3339",
    },
  },
}

export default customTheme
