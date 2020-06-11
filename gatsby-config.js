require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

module.exports = {
  siteMetadata: {
    title: `some blog`,
    description: `TODO: make description`,
    author: `@gatsbyjs`,
    siteUrl: `http://localhost:8000`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        baseUrl: `${process.env.GATSBY_WP_URL}`,
        protocol: `${process.env.GATSBY_WP_PROTOCOL}`,
        restApiRoutePrefix: 'wp-json',
        hostingWPCOM: false,
        useACF: true,
        acfOptionPageIds: [],
        auth: {
          htaccess_user: 'your-htaccess-username',
          htaccess_pass: 'your-htaccess-password',
          htaccess_sendImmediately: false,
          wpcom_app_clientSecret: process.env.WORDPRESS_CLIENT_SECRET,
          wpcom_app_clientId: '54793',
          wpcom_user: 'gatsbyjswpexample@gmail.com',
          wpcom_pass: process.env.WORDPRESS_PASSWORD

          // jwt_user: process.env.JWT_USER,
          // jwt_pass: process.env.JWT_PASSWORD,
          // jwt_base_path: '/jwt-auth/v1/token' // Default - can skip if you are using https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/
        },

        cookies: {},
        verboseOutput: false,
        // Set how many pages are retrieved per API request.
        perPage: 100,
        // Search and Replace Urls across WordPress content.
        searchAndReplaceContentUrls: {
          sourceUrl: 'https://source-url.com',
          replacementUrl: 'https://replacement-url.com'
        },
        // Set how many simultaneous requests are sent at once.
        concurrentRequests: 10,
        // '**/*/*/categories'
        includedRoutes: [
          '**/categories',
          '**/posts',
          '**/pages',
          '**/media',
          '**/taxonomies',
          '**/users',
          '**/menus',
          '**/portfolio',
          '**/favicon',
          '**/logo'
        ],
        // Blacklisted routes using glob patterns
        excludedRoutes: [],
        keepMediaSizes: false,
        // use a custom normalizer which is applied after the built-in ones.
        normalizer: function ({ entities }) {
          return entities
        },
        normalizers: normalizers => [
          ...normalizers,
          {
            name: 'nameOfTheFunction',
            normalizer: function ({ entities }) {
              // manipulate entities here
              return entities
            }
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`
        // icon: `src/images/gatsby-icon.png` // This path is relative to the root of the site.
      }
    },
    // 'gatsby-plugin-postcss', was for tailwind
    'gatsby-plugin-styled-components',
    'gatsby-plugin-sitemap'
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
}
