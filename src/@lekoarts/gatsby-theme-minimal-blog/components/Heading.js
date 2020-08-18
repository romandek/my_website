import React from 'react'
import Box from '@theme-ui/components/src/Box'

export const Heading = React.forwardRef((props, ref) => (
  <Box
    ref={ref}
    as="h1"
    variant="heading"
    {...props}
    __themeKey="text"
    __css={{
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading'
    }}
  />
))