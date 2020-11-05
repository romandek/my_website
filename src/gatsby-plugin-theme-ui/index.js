import { merge } from "theme-ui"
import { tailwind } from "@theme-ui/presets"

const theme = merge(tailwind, {
  initialColorModeName: `dark`,
  useCustomProperties: true,
  colors: {
    text: `#202030`,
    primary: `#067BC2`,
    secondary: `#7B45B9`,//`#8852e0`, //`#5623A9`,
    tertiary: `#A390CF`,
    toggleIcon: `#7B45B9`,
    background: `#FEFEFC`,
    heading: `#202030`,
    divide: `#F7F7E8`,
    codebg: tailwind.colors.gray[3],
    modes: {
      dark: {
        text: `#D9D5D2`,
        primary: `#129FF8`,
        secondary: `#A57EF3`,
        tertiary: `#495172`,
        toggleIcon: `#A57EF3`, //`#AD88E7`,
        background: `#202040`,
        heading: `#D9D5D2`, 
        divide: `#292951`, //`#404060`,
        muted: tailwind.colors.gray[8],
        codebg: tailwind.colors.gray[7],
      },
    },
  },
  fonts: {
    body: `"IBM Plex Sans", -apple-system, BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"`,
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
  space: [0, '0.25rem', '0.5rem', '1rem', '1.5rem', '2rem', '4rem', '8rem', '16rem', '32rem'],
  styles: {
    root: {
      color: `text`,
      backgroundColor: `background`,
      margin: 0,
      padding: 0,
      boxSizing: `border-box`,
      textRendering: `optimizeLegibility`,
      WebkitFontSmoothing: `antialiased`,
      MozOsxFontSmoothing: `grayscale`,
    },
    p: {
      fontSize: [2, 2, 3],
      //letterSpacing: `-0.003em`,
      lineHeight: `body`,
      "--baseline-multiplier": 0.179,
      "--x-height-multiplier": 0.35,
      mb: 4,
    },
    ul: {
      listStyle: `none`,
      //pl: 0,
      li: {
        '&:before': {
          content: `'-'`,
          pr: [2],
        },
        fontSize: [2, 2, 3],
        letterSpacing: `-0.003em`,
        lineHeight: `body`,
        "--baseline-multiplier": 0.179,
        "--x-height-multiplier": 0.35,
        ul: {
          li: {
            "&:before": {
              content: `'+'`,
              pr: [2],
            }
          }
        }
      },
    },
    ol: {
      li: {
        fontSize: [1, 1, 2],
        letterSpacing: `-0.003em`,
        lineHeight: `body`,
        "--baseline-multiplier": 0.179,
        "--x-height-multiplier": 0.35,
      },
    },
    h1: {
      variant: `text.heading`,
      fontSize: [4, 5, 6],
      mt: 4,
    },
    h2: {
      variant: `text.heading`,
      fontSize: [3, 4, 5],
      mt: 4,
    },
    h3: {
      variant: `text.heading`,
      fontSize: [2, 3, 4],
      mt: 4,
    },
    h4: {
      variant: `text.heading`,
      fontSize: [2, 3, 4],
      mt: 3,
    },
    h5: {
      variant: `text.heading`,
      fontSize: [1, 2, 3],
      mt: 3,
    },
    h6: {
      variant: `text.heading`,
      fontSize: 1,
      mb: 2,
    },
    blockquote: {
      borderLeftColor: `primary`,
      borderLeftStyle: `solid`,
      borderLeftWidth: `6px`,
      mx: 0,
      pl: 4,
      p: {
        fontStyle: `italic`,
      },
    },
    table: {
      width: `100%`,
      my: 4,
      borderCollapse: `separate`,
      borderSpacing: 0,
      [[`th`, `td`]]: {
        textAlign: `left`,
        py: `4px`,
        pr: `4px`,
        pl: 0,
        borderColor: `muted`,
        borderBottomStyle: `solid`,
      },
    },
    th: {
      verticalAlign: `bottom`,
      borderBottomWidth: `2px`,
      color: `heading`,
    },
    td: {
      verticalAlign: `top`,
      borderBottomWidth: `1px`,
    },
    hr: {
      mx: 0,
    },
  },
  layout: {
    container: {
      padding: [3, 4],
      maxWidth: `800px`,
    },
  },
  text: {
    heading: {
      fontFamily: `heading`,
      fontWeight: `heading`,
      lineHeight: `heading`,
      color: `heading`,
    },
  },
  dividers: {
    bottom: {
      borderBottomStyle: `solid`,
      borderBottomWidth: `1px`,
      borderBottomColor: `divide`,
      pb: 3,
    },
    top: {
      borderTopStyle: `solid`,
      borderTopWidth: `1px`,
      borderTopColor: `divide`,
      pt: 3,
    },
  },
  links: {
    secondary: {
      color: `secondary`,
      textDecoration: `none`,
      ":hover": {
        color: `heading`,
        textDecoration: `underline`,
      },
      ":focus": {
        color: `heading`,
      },
    },
    tertiary: {
      color: `tertiary`,
      textDecoration: `none`,
      ":hover": {
        color: `heading`,
        textDecoration: `underline`,
      },
      ":focus": {
        color: `heading`,
      },
    },
    listItem: {
      fontSize: [1, 2, 3],
      color: `primary`,
    },
  },
})

export default theme