module.exports = (themeOptions) => {
  const basePath = themeOptions.basePath || `/`
  const blogPath = themeOptions.blogPath || `/blog`
  const postsPath = themeOptions.postsPath || `content/posts`
  const postsPrefix = themeOptions.postsPrefix || `/`
  const notesPath = themeOptions.postsPath || `/notes`  
  const pagesPath = themeOptions.pagesPath || `content/pages`
  const tagsPath = themeOptions.tagsPath || `/tags`
  const labelsPath = themeOptions.tagsPath || `/labels`
  const externalLinks = themeOptions.externalLinks || []
  const navigation = themeOptions.navigation || []
  const showLineNumbers = themeOptions.showLineNumbers !== false
  const showCopyButton = themeOptions.showCopyButton !== false
  const formatString = themeOptions.formatString || `YYYY.MM.DD`

  return {
    basePath,
    blogPath,
    postsPath,
    postsPrefix,
    notesPath,
    pagesPath,
    tagsPath,
    labelsPath,
    externalLinks,
    navigation,
    showLineNumbers,
    showCopyButton,
    formatString,
  }
}
