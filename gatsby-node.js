exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createRedirect } = actions

  const result = await graphql(`
    query {
      allPost(limit: 1, sort: {fields: date, order: DESC}) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`There was an error fetching the latest blog post`, result.errors)
    return
  }

  const latestPosts = result.data.allPost.edges

  latestPosts.forEach((latestPost) => {
    createRedirect({
      fromPath: "/latest",
      toPath: latestPost.node.slug,
      isPermanent: true,
    })
  })
}