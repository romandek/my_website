require(`dotenv`).config({
  path: `.env`,
})

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE

module.exports = {
  
  siteMetadata: {
      siteTitle: `Roman Dek`,
      siteTitleAlt: `Roman Dek — data analyst, developer`,
      siteHeadline: `Roman Dek`,
      siteUrl: `https://romandek.com`,
      siteDescription: `Personal website of Roman Dek.`,
      siteLanguage: `en`,
      siteImage: `/banner.jpg`,
      author: `@romandek`,
  },
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`,
      // See the theme's README for all available options
      options: {
        mdx: false, 
        blogPath: "/blog",
        navigation: [
          {
            title: `Blog`,
            slug: `/blog`,
          },
          {
            title: `Notes`,
            slug: `/notes`,
          },
          {
            title: `Projects`,
            slug: `/projects`,
          },
          {
            title: `About`,
            slug: `/about`,
          },
        ],
        externalLinks: [
          {
            name: `Twitter`,
            url: `http://rdek.me/twitter`,
          },
          {
            name: `GitHub`,
            url: `http://rdek.me/git`,
          },
        ],
      },
      feedTitle: `Roman Dek — data analyst, developer`,
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Roman Dek`,
        short_name: `Roman Dek`,
        description: `Personal website of Roman Dek.`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#6B46C1`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "notes",
        path: `content/notes`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`,
    `gatsby-plugin-netlify-cms`,
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {
        analyzerMode: `static`,
        reportFilename: `_bundle.html`,
        openAnalyzer: false,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          { 
            resolve: `gatsby-remark-external-links`,
            options: {
                target: "_blank",
                rel: "noopener noreferrer nofollow",
            },
          },
        ],
      }
    },
  ].filter(Boolean),
}