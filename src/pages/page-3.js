import React from "react"
import {graphql, StaticQuery, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const getImageData = graphql`
{
  allFile {
    edges {
      node {
      relativePath
        size 
        extension
        birthTime
      }
    }
  }
}
`

export default  () => (
  <Layout>
      <h1>Hello from Page 3!</h1>
      <h3>File Data</h3>
      <StaticQuery 
        query={getImageData}
        render={data => (
          <table>
            <thead>
              <th>Relative Path</th>
              <th>Size Of Image</th>
              <th>Extension</th>
              <th>Birth Time</th>
            </thead>
            <tbody>
              {data.allFile.edges.map((edge,index) => (
                <tr key={index}>
                  <td>{edge.node.relativePath}</td>
                  <td>{edge.node.size}</td>
                  <td>{edge.node.extension}</td>
                  <td>{edge.node.birthTime}</td>



                </tr>
              ))}
            </tbody>
            
          </table>
        )}
      />
      <Link to="/page-2">Go to page 2.</Link>
  </Layout>
)

