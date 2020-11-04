import React from "react"
import Labels from "../../../gatsby-theme-minimal-blog/components/labels"

type Props = {
  data: {
    allNote: {
      group: {
        fieldValue: string
        totalCount: number
      }[]
    }
  }
}

export default function MinimalBlogCoreTags({ data }: Props) {
  const { allNote } = data

  return <Labels list={ allNote.group } />
}
