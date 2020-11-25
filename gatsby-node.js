const kebabCase = require(`lodash.kebabcase`)
const withDefaults = require(`./src/@lekoarts/gatsby-theme-minimal-blog-core/utils/default-options`)

const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type NoteLabel { 
      name: String
      slug: String
    }

    interface Note @nodeInterface {
      id: ID!
      slug: String!
      type: String!
      title: String!
      date: Date! @dateformat
      excerpt(pruneLength: Int = 160): String!
      body: String!
      html: String
      timeToRead: Int
      labels: [NoteLabel]
      description: String
    }
    
    type MdxNote implements Node & Note {
      slug: String!
      title: String!
      date: Date! @dateformat
      type: String!
      excerpt(pruneLength: Int = 140): String! @mdxpassthrough(fieldName: "excerpt")
      body: String! @mdxpassthrough(fieldName: "body")
      html: String! @mdxpassthrough(fieldName: "html")
      timeToRead: Int @mdxpassthrough(fieldName: "timeToRead")
      labels: [NoteLabel]
      description: String
    }    
  `)
}

exports.createResolvers = ({
  actions,
  createResolvers,
}, themeOptions) => {

  const { createNode } = actions

  const { notesPath, labelsPath } = withDefaults(themeOptions)

  createResolvers({
    MinimalBlogConfig: {
      notesPath: {
        type: `String`,
        resolve(source, args, context, info) {
          return notesPath
        },
      },
      labelsPath: {
        type: `String`,
        resolve(source, args, context, info) {
          return labelsPath
        },
      },
    },
  })
}

exports.onCreateNode = ({ node, actions, getNode, createNodeId, createContentDigest }) => {

  const { createNode, createParentChildLink, createNodeField } = actions

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
  if (node.internal.type === `Mdx` && source === 'notes') {
    let modifiedLabels

    if (node.frontmatter.labels) {
      modifiedLabels = node.frontmatter.labels.map((label) => ({
        name: label,
        slug: kebabCase(label),
      }))
    } else {
      modifiedLabels = null
    }

    const fieldData = {
      slug: node.frontmatter.slug ? node.frontmatter.slug : createFilePath({ node, getNode, basePath: "notes" }),
      title: node.frontmatter.title,
      date: node.frontmatter.date,
      type: node.frontmatter.type,
      labels: modifiedLabels,
      description: node.frontmatter.description,
    }

    const mdxNoteId = createNodeId(`${node.id} >>> MdxNote`)

    createNode({
      ...fieldData,
      // Required fields
      id: mdxNoteId,
      parent: node.id,
      children: [],
      internal: {
        type: `MdxNote`,
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
        description: `Mdx implementation of the Note interface`,
      },
    })

    createParentChildLink({ parent: node, child: getNode(mdxNoteId) })
  }
}

const postTemplate = require.resolve(`@lekoarts/gatsby-theme-minimal-blog-core/src/templates/post-query.tsx`)
const noteTemplate = require.resolve(`./src/templates/note.tsx`)
const labelsTemplate = require.resolve(`./src/@lekoarts/gatsby-theme-minimal-blog-core/src/templates/labels-query.tsx`)
const labelTemplate = require.resolve(`./src/@lekoarts/gatsby-theme-minimal-blog-core/src/templates/label-query.tsx`)

exports.createPages = async ({ actions, graphql, reporter }, themeOptions) => {
  const { createRedirect, createPage } = actions

  const { basePath, blogPath, notesPath, labelsPath, formatString } = withDefaults(themeOptions)

  const result = await graphql(`
    query {
      allNote(sort: {fields: date, order: DESC}) {
        nodes {
          slug
        }
      }
      allPost(sort: { fields: date, order: DESC }) {
        nodes {
          slug
        }
      }
      labels: allNote(sort: { fields: labels___name, order: DESC }) {
        group(field: labels___name) {
          fieldValue
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`There was an error loading your notes`, result.errors)
    return
  }

  const allNotes = result.data.allNote.nodes
  const allPosts = result.data.allPost.nodes
  const latestPost = result.data.allPost.nodes[0]
  const latestNote = result.data.allNote.nodes[0]
  const labels = result.data.labels.group

  allPosts.forEach((post) => { 
    createPage({
      path: `/${basePath}/${blogPath}/${post.slug}`.replace(/\/\/+/g, `/`),
      component: postTemplate,
      context: {
        slug: post.slug,
        formatString,
      },
    })
  })

  allNotes.forEach((note) => {
    createPage({
      path: `/${basePath}/${notesPath}/${note.slug}`.replace(/\/\/+/g, `/`),
      component: noteTemplate,
      context: {
        slug: note.slug,
        formatString
      },
    })
  })

  createPage({
    path: `/${basePath}/${labelsPath}`.replace(/\/\/+/g, `/`),
    component: labelsTemplate,
  })

  if (labels.length > 0) {
    labels.forEach((label) => {
      createPage({
        path: `/${basePath}/${labelsPath}/${kebabCase(label.fieldValue)}`.replace(/\/\/+/g, `/`),
        component: labelTemplate,
        context: {
          slug: kebabCase(label.fieldValue),
          name: label.fieldValue,
          formatString,
        },
      })
    })
  }

  createRedirect({
    fromPath: "/blog/latest",
    toPath: latestPost.slug,
    isPermanent: true,
    force: true
  })

  createRedirect({
    fromPath: "/notes/latest",
    toPath: latestNote.slug,
    isPermanent: true,
    force: true
  })
} 

exports.onCreatePage = ({ page, actions }, themeOptions) => {
  const { createPage, deletePage } = actions

  const { formatString } = withDefaults(themeOptions)

  if (/^\/?notes\/?$/.test(page.path)) {
    deletePage(page)
    // You can access the variable "house" in your page queries now
    createPage({
      ...page,
      context: {
        ...page.context,
        formatString,
      },
    })
  }
}