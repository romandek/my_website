const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createSchemaCustomization = ({ actions }, ) => {
  const { createTypes } = actions

  createTypes(`
    interface KbArticle @nodeInterface {
      id: ID!
      slug: String!
      type: String!
      title: String!
      rating: Int!
      excerpt(pruneLength: Int = 160): String!
      body: String!
      html: String
      timeToRead: Int
      tags: [String]
      cover: File @fileByRelativePath
      description: String
    }
    
    type MdxKbArticle implements Node & KbArticle {
      slug: String!
      title: String!
      type: String!
      rating: Int!
      excerpt(pruneLength: Int = 140): String! @mdxpassthrough(fieldName: "excerpt")
      body: String! @mdxpassthrough(fieldName: "body")
      html: String! @mdxpassthrough(fieldName: "html")
      timeToRead: Int @mdxpassthrough(fieldName: "timeToRead")
      tags: [String]
      cover: File @fileByRelativePath
      description: String
    }
  `)
}

exports.onCreateNode = ({ node, actions, getNode, createNodeId, createContentDigest }, themeOptions) => {
  const { createNode, createParentChildLink } = actions

  // Make sure that it's an MDX node
  if (node.internal.type !== `Mdx`) {
    return
  }

  // Create a source field
  // And grab the sourceInstanceName to differentiate the different sources
  // In this case "postsPath" and "pagesPath"
  const fileNode = getNode(node.parent)
  const source = fileNode.sourceInstanceName

  // Check for "posts" and create the "Post" type
  if (node.internal.type === `Mdx` && source === 'kb') {
    const fieldData = {
      slug: node.frontmatter.slug ? node.frontmatter.slug : createFilePath({ node, getNode, basePath: "kbArticles" }),
      title: node.frontmatter.title,
      type: node.frontmatter.type,
      rating: node.frontmatter.rating,
      tags: node.frontmatter.tags,
      cover: node.frontmatter.cover,
      description: node.frontmatter.description,
    }

    const mdxKbArticleId = createNodeId(`${node.id} >>> MdxKbArticle`)

    createNode({
      ...fieldData,
      // Required fields
      id: mdxKbArticleId,
      parent: node.id,
      children: [],
      internal: {
        type: `MdxKbArticle`,
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
        description: `Mdx implementation of the KbArticle interface`,
      },
    })

    createParentChildLink({ parent: node, child: getNode(mdxKbArticleId) })
  }
}

const kbTemplate = require.resolve(`./src/pages/kb.jsx`)
const kbArticleTemplate = require.resolve(`./src/templates/kbArticle.jsx`)

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  // createPage({
  //   path: `/kb`.replace(/\/\/+/g, `/`),
  //   component: kbTemplate,
  // })

  const result = await graphql(`
    query {
      allKbArticle {
        nodes {
          slug
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`There was an error loading your KB articles`, result.errors)
    return
  }

  const kbArticles = result.data.allKbArticle.nodes

  kbArticles.forEach((kbArticle) => {
    createPage({
      path: kbArticle.slug,
      component: kbArticleTemplate,
      context: {
        slug: kbArticle.slug,
      },
    })
  })
} 