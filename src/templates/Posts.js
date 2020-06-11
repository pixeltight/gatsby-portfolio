import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import styled from 'styled-components'

const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
`

const PageNumberWrapper = styled.div`
  border: 1px solid #ccc;
  background: ${props => (props.isCurrentPage ? '#eee' : '#fff')};
`

const PageNumber = styled(Link)`
  display: block;
  padding: 8px 16px;
`

export default ({ pageContext }) => {
  return (
    <Layout>
      {pageContext.posts.map(post => (
        <div key={post.node.wordpress_id}>
          <h3 dangerouslySetInnerHTML={{ __html: post.node.title }} />
          <small>{post.node.date}</small>
          <p dangerouslySetInnerHTML={{ __html: post.node.excerpt }} />
          <div>
            <Link to={`/post/${post.node.slug}`}>Read more...</Link>
          </div>
        </div>
      ))}

      <Pagination>
        {Array.from({ length: pageContext.numberOfPages }).map(
          (page, index) => (
            <PageNumberWrapper
              key={index}
              isCurrentPage={index + 1 === pageContext.currentPage}
            >
              <PageNumber to={index === 0 ? `/blog` : `/blog/${index + 1}/`}>
                {index + 1}
              </PageNumber>
            </PageNumberWrapper>
          )
        )}
      </Pagination>
    </Layout>
  )
}
