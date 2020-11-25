import { graphql, useStaticQuery } from "gatsby"

type UseMinimalBlogConfigProps = {
  minimalBlogConfig: {
    basePath: string
    blogPath: string
    postsPath: string
    notesPath: string
    pagesPath: string
    tagsPath: string
    labelsPath: string
    externalLinks: {
      name: string
      url: string
    }[]
    navigation: {
      title: string
      slug: string
    }[]
    showLineNumbers: boolean
  }
}

const useMinimalBlogConfig = () => {
  const data = useStaticQuery<UseMinimalBlogConfigProps>(graphql`
    query {
      minimalBlogConfig {
        basePath
        blogPath
        postsPath
        notesPath
        pagesPath
        tagsPath
        labelsPath
        externalLinks {
          name
          url
        }
        navigation {
          title
          slug
        }
        showLineNumbers
      }
    }
  `)

  return data.minimalBlogConfig
}

export default useMinimalBlogConfig
