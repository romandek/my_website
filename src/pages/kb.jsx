/** @jsx jsx */
import React from "react"
import { jsx, Heading, Box, Link as TLink } from "theme-ui"
import { graphql, Link } from "gatsby"
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout"

const ListItem = ({ item }) => {
  return (
    <Box mb={4} mt={4}>
      <TLink as={Link} to={item.slug} sx={{ fontSize: [1, 2, 3], color: `text` }}>
        {item.title}
      </TLink>
      <p sx={{ color: `secondary`, mt: 1, a: { color: `secondary` }, fontSize: [1, 1, 2] }}>
        {item.tags && item.tags.map((tag, i) => (
          <React.Fragment key={tag}>
            {!!i && `, `}
            <span>{tag}</span>
          </React.Fragment>
        ))}
      </p>
    </Box>
  )
}

const KbArticles = ({ data }) => {
  return (
    <Layout>
      <Heading variant="styles.h2">KB articles</Heading>
      {data.allKbArticle.nodes.map(kbArticle => (
        <ListItem key={kbArticle.slug} item={kbArticle} />
      ))}
    </Layout>
  )
}

export default KbArticles

export const query = graphql`
    query {
        allKbArticle {
            nodes {
                title
                tags
                slug
            }
        }
    }
`