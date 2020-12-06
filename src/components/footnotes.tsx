import React from "react"
import { Heading } from "theme-ui"
import { Box, Divider } from "@theme-ui/components"

const Footnotes = ({data}) => {
  return (
    <Box mt={6}>
      <Divider/>
        <Heading variant="styles.h4" sx={{mt: 5}}>Noted</Heading>
        {data.props.children[1]}
    </Box>
  )
}

export default Footnotes;