const path = require(`path`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage, createRedirect } = actions
  createRedirect({
    fromPath: '/',
    toPath: '/home',
    redirectInBrowser: true,
    isPermanent: true
  })

  // const BlogPostTemplate = path.resolve('./src/templates/BlogPost.js')
  const PageTemplate = path.resolve('./src/templates/Page.js')
  const PostsTemplate = path.resolve('./src/templates/Posts.js')
  const PortfolioUnderContentTemplate = path.resolve(
    './src/templates/PortfolioUnderContent.js'
  )
  const PortfolioPostTemplate = path.resolve('./src/templates/PortfolioPost.js')

  // query content for WordPress posts
  const result = await graphql(`
    query {
      allWordpressPage {
        edges {
          node {
            id
            slug
            status
            template
            title
            content
            wordpress_id
          }
        }
      }
      allWordpressWpPortfolio {
        edges {
          node {
            id
            slug
            content
            title
            excerpt
            featured_media {
              source_url
            }
            acf {
              portfolio_url
            }
          }
        }
      }
      allWordpressPost {
        edges {
          node {
            title
            content
            excerpt
            wordpress_id
            date(formatString: "MMM Do YYYY HH:mm")
            slug
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const Pages = result.data.allWordpressPage.edges
  Pages.forEach(page => {
    // console.log(page.node.title, page.node.template)
    createPage({
      path: `/${page.node.slug}`,
      component:
        page.node.template === 'portfolio_under_content.php'
          ? PortfolioUnderContentTemplate
          : PageTemplate,
      context: page.node
    })
  })

  const Posts = result.data.allWordpressPost.edges
  const postsPerPage = 2
  const numberOfPages = Math.ceil(Posts.length / postsPerPage)
  Array.from({ length: numberOfPages }).forEach((post, index) => {
    createPage({
      path: index === 0 ? `/blog` : `/blog/${index + 1}/`,
      component: PostsTemplate,
      context: {
        posts: Posts.slice(
          index * postsPerPage,
          index * postsPerPage + postsPerPage
        ),
        numberOfPages,
        currentPage: index + 1
      }
    })
  })

  Posts.forEach(post => {
    createPage({
      path: `/post/${post.node.slug}`,
      component: PageTemplate,
      context: post.node
    })
  })

  const PortfolioPosts = result.data.allWordpressWpPortfolio.edges
  PortfolioPosts.forEach(portfolioPost => {
    createPage({
      path: `/portfolio/${portfolioPost.node.slug}`,
      component: PortfolioPostTemplate,
      context: portfolioPost.node
    })
  })
}
