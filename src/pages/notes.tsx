/** @jsx jsx */
import React from "react"
import { jsx, Heading, Box, Link as TLink } from "theme-ui"
import { graphql, Link } from "gatsby"
import { Flex } from "@theme-ui/components"
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout"
import useMinimalBlogConfig from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-minimal-blog-config"
import SEO from "@lekoarts/gatsby-theme-minimal-blog/src/components/seo"
import replaceSlashes from "@lekoarts/gatsby-theme-minimal-blog/src/utils/replaceSlashes"
import ItemLabels from "../@lekoarts/gatsby-theme-minimal-blog/components/notes-item-labels"

const ListItem = ({ item }) => {
  return (
    <Box mb={4} mt={4}>
      <TLink as={Link} to={item.slug} sx={{ fontSize: [2, 3, 4], fontWeight: `medium`, color: `text` }}>
        {item.title}
      </TLink>
      <p sx={{ color: `tertiary`, mt: 1, a: { color: `tertiary` }, fontSize: [1, 1, 2] }}>
      {item.labels && (
        <React.Fragment>
          <ItemLabels labels={item.labels} />
        </React.Fragment>
      )}
      </p>
    </Box>
  )
}

const Notes = ({ data }) => {
  const { basePath } = useMinimalBlogConfig()

  const labelsPath = "/labels" //TODO: paremetrize!

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
        <ListItem key={note.slug} item={note} />
      ))}
    </Layout>
  )
}

export default Notes

export const query = graphql`
    query {
        allNote(sort: { fields: date, order: DESC }) {
            nodes {
                title
                date
                labels {
                  name
                  slug
                }
                slug
            }
        }
    }
`