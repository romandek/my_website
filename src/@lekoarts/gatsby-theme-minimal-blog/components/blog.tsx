/** @jsx jsx */
import { jsx, Link as TLink } from "theme-ui"
import { Heading } from "./Heading"
import { Link } from "gatsby"
import { Flex } from "@theme-ui/components"
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout"
import Listing from "./listing"
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config"
import replaceSlashes from "@lekoarts/gatsby-theme-minimal-blog/src/utils/replaceSlashes"
import SEO from "@lekoarts/gatsby-theme-minimal-blog/src/components/seo"

type PostsProps = {
  posts: {
    slug: string
    title: string
    date: string
    excerpt: string
    description: string
    timeToRead?: number
    tags?: {
      name: string
      slug: string
    }[]
  }[]
}

const Blog = ({ posts }: PostsProps) => {
  const { tagsPath, basePath } = useMinimalBlogConfig()

  return (
    <Layout>
      <SEO title="Blog" />
      <Flex sx={{ alignItems: `center`, justifyContent: `space-between`, flexFlow: `wrap` }}>
        <Heading variant="styles.h1" sx={{ mt: 0 }}>Blog</Heading>
        <TLink as={Link} sx={{ variant: `links.secondary` }} to={replaceSlashes(`/${basePath}/${tagsPath}`)}>
          View all tags
        </TLink>
      </Flex>
      <Listing posts={posts} sx={{ mt: [4, 5] }} />
    </Layout>
  )
}

export default Blog
