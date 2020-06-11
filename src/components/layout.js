import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import { Helmet } from 'react-helmet'

import MainMenu from './MainMenu'

import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Open Sans', sans-serif;
    margin: 0 !important;
    padding: 0 !important;
  }
`

const LayoutWrapper = styled.div`
  max-width: 960px;
  margin: 0 auto;
`

const Layout = ({ children }) => (
  <>
    <StaticQuery
      query={graphql`
        {
          allWordpressWpFavicon {
            edges {
              node {
                url {
                  source_url
                }
              }
            }
          }
        }
      `}
      render={props => (
        <Helmet>
          <link
            rel='icon'
            href={props.allWordpressWpFavicon.edges[0].node.url.source_url}
          />
          <link href='https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap' />
        </Helmet>
      )}
    />
    <GlobalStyles />
    <MainMenu />
    <LayoutWrapper>{children}</LayoutWrapper>
  </>
)
export default Layout
