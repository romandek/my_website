import React from "react"
import { Link as TLink } from "theme-ui"
import { Link } from "gatsby"
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config"
import replaceSlashes from "@lekoarts/gatsby-theme-minimal-blog/src/utils/replaceSlashes"

type LabelsProps = {
  labels: {
    name: string
    slug: string
  }[]
}

const ItemLabels = ({ labels }: LabelsProps) => {
  const { basePath, labelsPath } = useMinimalBlogConfig()

  return (
    <React.Fragment>
      {labels.map((label, i) => (
        <React.Fragment key={label.slug}>
          {!!i && `, `}
          <TLink as={Link} to={replaceSlashes(`/${basePath}/${labelsPath}/${label.slug}`)}>
            {label.name}
          </TLink>
        </React.Fragment>
      ))}
    </React.Fragment>
  )
}

export default ItemLabels
