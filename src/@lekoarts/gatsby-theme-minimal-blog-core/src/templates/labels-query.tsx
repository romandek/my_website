import { graphql } from "gatsby"
import LabelsComponent from "../components/labels"

export default LabelsComponent

export const query = graphql`
  query {
    allNote(sort: { fields: labels___name, order: DESC }) {
      group(field: labels___name) {
        fieldValue
        totalCount
      }
    }
  }
`
