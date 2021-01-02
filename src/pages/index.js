import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { node } from "prop-types"

const Title = styled.h1`
  display: inline-block;
`

const BlogTitle = styled.h3`
  margin-bottom: 20px;
  &:hover {
    color: #1dcaff;
  }
`

const BlogLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`

const BlogBody = styled.div`
  margin-bottom: 50px;
`

export default ({ data }) => {
  // console.log(data)

  return (
    <Layout>
      <SEO title="Home" />
      <div>
        <Title>Hue's Blog</Title>
        <h4>{data.allMarkdownRemark.totalCount} posts </h4>
        {
          data.allMarkdownRemark.edges.map( ({node}) => (
            <BlogBody key={ node.id } >
              <BlogLink to={node.fields.slug}>
                <BlogTitle>{ node.frontmatter.title } - { node.frontmatter.date }</BlogTitle>
                <p>{ node.excerpt }</p>
              </BlogLink>
            </BlogBody>
          )
        )}
      </div>
    </Layout>
  )
}

export const query = graphql`
    query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            description
          }
          fields {
            slug
          }
          excerpt(truncate: true)
        }
      }
    }
  }
`