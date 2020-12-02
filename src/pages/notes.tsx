/** @jsx jsx */
import React from "react"
import { jsx, Heading, Box, Link as TLink } from "theme-ui"
import { graphql, Link } from "gatsby"
import { Flex } from "@theme-ui/components"
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout"
import NotesListItem from "../@lekoarts/gatsby-theme-minimal-blog/components/notes-list-item"
import useMinimalBlogConfig from "../@lekoarts/gatsby-theme-minimal-blog/hooks/use-minimal-blog-config"
import SEO from "@lekoarts/gatsby-theme-minimal-blog/src/components/seo"
import replaceSlashes from "@lekoarts/gatsby-theme-minimal-blog/src/utils/replaceSlashes"

const Notes = ({ data }) => {
  const { basePath, notesPath, labelsPath } = useMinimalBlogConfig()

  return (
    <Layout>
      <SEO title="Notes" />
      <Flex sx={{ alignItems: `center`, justifyContent: `space-between`, flexFlow: `wrap` }}>
        <Heading variant="styles.h1" sx={{ mt: 0 }}>Notes</Heading>
        <TLink as={Link} sx={{ variant: `links.secondary` }} to={replaceSlashes(`/${basePath}/${labelsPath}`)}>
          View all labels
        </TLink>
      </Flex>
      {data.allNote.nodes.map(note => (
        <NotesListItem key={note.slug} note={note} />
      ))}
    </Layout>
  )
}

export default Notes

export const query = graphql`
    query($formatString: String!) {
        allNote(sort: { fields: date, order: DESC }) {
            nodes {
                title
                date(formatString: $formatString)
                labels {
                  name
                  slug
                }
                slug
            }
        }
    }
`