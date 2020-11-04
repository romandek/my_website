import { graphql } from "gatsby"
import LabelComponent from "../components/label"

export default LabelComponent

export const query = graphql`
  query($slug: String!, $formatString: String!) {
    allNote(sort: { fields: date, order: DESC }, filter: { labels: { elemMatch: { slug: { eq: $slug } } } }) {
      nodes {
        slug
        title
        date(formatString: $formatString)
        excerpt
        timeToRead
        description
        labels {
          name
          slug
        }
      }
    }
  }
`
