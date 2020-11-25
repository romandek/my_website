/** @jsx jsx */
import { jsx, Heading } from "theme-ui"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import React from "react"
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout"
import ItemLabels from "../@lekoarts/gatsby-theme-minimal-blog/components/notes-item-labels"

const px = [`32px`, `16px`, `8px`, `4px`]
const shadow = px.map((v) => `rgba(0, 0, 0, 0.15) 0px ${v} ${v} 0px`)

const Note = ({ data: { note } }) => (
  <Layout>
    <Heading variant="styles.h1" sx={{ mt: 0 }}>{note.title}</Heading>
    <p sx={{ color: `tertiary`, mt: 3, a: { color: `tertiary` }, fontSize: [1, 1, 2] }}>
      {note.labels && (
        <React.Fragment>
          <ItemLabels labels={note.labels} />
        </React.Fragment>
      )}
      {note.timeToRead && ` — `}
      {note.timeToRead && <span>{note.timeToRead} min read</span>}
    </p>
    <section sx={{ my: 5, ".gatsby-resp-image-wrapper": { my: [4, 4, 5], boxShadow: shadow.join(`, `) } }}>
      <MDXRenderer>{note.body}</MDXRenderer>
    </section>
  </Layout>
)

export default Note

export const query = graphql`
    query($slug: String!, $formatString: String!) {
        note(slug: {eq: $slug}) {
          title
          date(formatString: $formatString)
          slug
          labels {
            name
            slug
          }
          body
        }
    }
` 