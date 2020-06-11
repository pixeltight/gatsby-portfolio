import React from 'react'
import { graphql, staticQuery } from 'gatsby'

const logo = props => (
  <StaticQuery
    query={graphql`
      {
        allWordpressWpLogo {
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
      <div>
        <img
          src={props.allWordpressLogo.edges[0].node.url.source_url}
          alt='logo'
        />
      </div>
    )}
  />
)

export default logo
