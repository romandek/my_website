/** @jsx jsx */
import React from "react"
import { jsx, Link as TLink } from "theme-ui"
import { Box } from "@theme-ui/components"
import { Link } from "gatsby"
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config"
import replaceSlashes from "@lekoarts/gatsby-theme-minimal-blog/src/utils/replaceSlashes"
import ItemLabels from "./notes-item-labels"

type NotesListItemProps = {
  note: {
    slug: string
    title: string
    date: string
    excerpt: string
    description: string
    timeToRead?: number
    labels?: {
      name: string
      slug: string
    }[]
  }
  showTags?: boolean
}

const BlogListItem = ({ note, showTags = true }: NotesListItemProps) => {
  const { basePath, notesPath } = useMinimalBlogConfig()

  return (
    <Box mb={4}>
      <TLink as={Link} to={replaceSlashes(`/${basePath}/${notesPath}/${note.slug}`)} sx={{ fontSize: [2, 3, 4], fontWeight: `medium`, color: `text` }}>
        {note.title}
      </TLink>
      <p sx={{ color: `tertiary`, mt: 1, a: { color: `tertiary` }, fontSize: [1, 1, 2] }}>
        <time>{note.date}</time>
        {note.labels && showTags && (
          <React.Fragment>
            {` — `}
            <ItemLabels labels={note.labels} />
          </React.Fragment>
        )}
      </p>
    </Box>
  )
}

export default BlogListItem
