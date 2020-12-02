module.exports = (themeOptions) => {
  const basePath = themeOptions.basePath || `/`
  const blogPath = themeOptions.blogPath || `/blog`
  const postsPath = themeOptions.postsPath || `content/posts`
  const notesPath = themeOptions.notesPath || `/notes`
  const pagesPath = themeOptions.pagesPath || `content/pages`
  const tagsPath = themeOptions.tagsPath || `/tags`
  const labelsPath = themeOptions.tagsPath || `/labels`
  const externalLinks = themeOptions.externalLinks || []
  const navigation = themeOptions.navigation || []
  const showLineNumbers = themeOptions.showLineNumbers || true
  const formatString = themeOptions.formatString || `DD.MM.YYYY`

  return {
    basePath,
    blogPath,
    postsPath,
    notesPath,
    pagesPath,
    tagsPath,
    labelsPath,
    externalLinks,
    navigation,
    showLineNumbers,
    formatString,
  }
}
