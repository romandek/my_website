import React from "react"
import Label from "../../../gatsby-theme-minimal-blog/components/label"

type Props = {
  data: {
    allNote: any
    [key: string]: any
  }
  pageContext: any
}

export default function MinimalBlogCoreTag({ data, pageContext }: Props) {
  const { allNote } = data

  return <Label notes={ allNote.nodes } pageContext={pageContext} />
}
