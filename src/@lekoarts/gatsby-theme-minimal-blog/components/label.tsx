/** @jsx jsx */
import { jsx, Heading, Link as TLink } from "theme-ui"
import { Flex } from "@theme-ui/components"
import { Link } from "gatsby"
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout"
import useMinimalBlogConfig from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-minimal-blog-config"
import Listing from "./notes-listing"
import replaceSlashes from "@lekoarts/gatsby-theme-minimal-blog/src/utils/replaceSlashes"
import SEO from "@lekoarts/gatsby-theme-minimal-blog/src/components/seo"

type LabelProps = {
  notes: {
    slug: string
    title: string
    date: string
    excerpt: string
    description: string
    timeToRead?: number
    labels: {
      name: string
      slug: string
    }[]
  }[]
  pageContext: {
    isCreatedByStatefulCreatePages: boolean
    slug: string
    name: string
    [key: string]: any
  }
}

const Label = ({ notes, pageContext }: LabelProps) => {
  const { basePath } = useMinimalBlogConfig()

  const labelsPath = "/labels" //TODO: paremetrize!

  return (
    <Layout>
      <SEO title={`Label: ${pageContext.name}`} />
      <Flex sx={{ alignItems: `center`, justifyContent: `space-between`, flexFlow: `wrap` }}>
        <Heading variant="styles.h1" sx={{ mt: 0 }}>{pageContext.name}</Heading>
        <TLink as={Link} sx={{ variant: `links.secondary` }} to={replaceSlashes(`/${basePath}/${labelsPath}`)}>
          View all labels
        </TLink>
      </Flex>
      <Listing notes={notes} showTags={false} sx={{ mt: [4, 5] }} />
    </Layout>
  )
}

export default Label
