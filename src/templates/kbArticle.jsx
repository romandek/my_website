/** @jsx jsx */
import { jsx, Heading } from "theme-ui"
import { MDXRenderer } from "gatsby-plugin-mdx"
/*import Img from "gatsby-image"*/
import { graphql } from "gatsby"
import React from "react"
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout"

const px = [`32px`, `16px`, `8px`, `4px`]
const shadow = px.map((v) => `rgba(0, 0, 0, 0.15) 0px ${v} ${v} 0px`)

const KbArticle = ({ data: { kbArticle } }) => (
  <Layout>
    <Heading variant="styles.h2">{kbArticle.title}</Heading>
    <p sx={{ color: `secondary`, mt: 3, a: { color: `secondary` }, fontSize: [1, 1, 2] }}>
      {kbArticle.tags && kbArticle.tags.map((tag, i) => (
        <React.Fragment key={tag}>
          {!!i && `, `}
          <span>{tag}</span>
        </React.Fragment>
      ))}
      {kbArticle.timeToRead && ` — `}
      {kbArticle.timeToRead && <span>{kbArticle.timeToRead} min read</span>}
    </p>
    {/*<Img fluid={kbArticle.cover.childImageSharp.fluid} />*/}
    <section sx={{ my: 5, ".gatsby-resp-image-wrapper": { my: [4, 4, 5], boxShadow: shadow.join(`, `) } }}>
      <MDXRenderer>{kbArticle.body}</MDXRenderer>
    </section>
  </Layout>
)

export default KbArticle

export const query = graphql`
    query($slug: String!) {
      kbArticle(slug: {eq: $slug}) {
            title
            tags
            body
            cover {
                childImageSharp {
                    fluid(maxWidth: 1000) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
        }
    }
` 