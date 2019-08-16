const { createFilePath } = require('gatsby-source-filesystem')
const path = require('path')
const PostTemplate = path.resolve('./src/templates/post-template.js');
const BlogTemplate = path.resolve('./src/templates/blog-template.js');
const ProductTemplate = path.resolve('./src/templates/product-template.js');

// this function is used to create a slug for each blog post page in the blog folder

//gatsby node lets us progamatically and dynamically change pages based on data that we have queried for certain files

// this file is where node js processes happen  ansd its the perfect place to create pages dynamiclly based from a source plugin.

//data in gatsby is based on edges and nodes

// on create node is called when a new node has been created or an old one has been updated

// theres a graphql for this in blog js file
exports.onCreateNode = ({node , getNode, actions}) => {
    const { createNodeField } = actions
    if(node.internal.type === 'MarkdownRemark') {

        
        const slug = createFilePath({ node , getNode, basePath:'posts'})
        createNodeField({
            node,
            name: 'slug',
            value: slug
        })
    }
}

// new functions for programtically creating pages with gatsby-node

exports.createPages = async({graphql,actions}) => {

    // this is a create page function being declared from the actions object
    const { createPage } = actions

    // this query below gets data for the posts such as the slug name which is actually the name of the folder
    const result = await graphql(`
    {
        allMarkdownRemark(limit: 1000) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
  
        allContentfulProduct {
          edges {
            node {
              slug
            }
          }
        }
      }
    `)
    

    
    const posts = result.data.allMarkdownRemark.edges

    // posts is an array of info that the gql returns


    //context lets us pass info to pages
    posts.forEach(({node:post}) => {
        createPage({
            path: `posts${post.fields.slug}`,
            component: PostTemplate,
            context: {
                slug: post.fields.slug
            }
        })
    })

    posts.forEach((_,index,postsArr) => {
        const totalPages = postsArr.length
        const postsPerPage = 1
        const currentPage = index +1
        const isFirtstPage = index === 0
        const isLastPage = index === totalPages
        createPage({
            path: isFirtstPage ? '/blog' :`/blog/${currentPage}`,
            component: BlogTemplate,
            context:    {
                limit: postsPerPage,
                skip: index * postsPerPage,
                isFirtstPage,
                isLastPage,
                currentPage,
                totalPages
            }
        })
    })
    const products = result.data.allContentfulProduct.edges
    products.forEach(({ node: product }) => {
        createPage({
        path: `/products/${product.slug}`,
        component: ProductTemplate,
        context: {
            slug: product.slug,
        },
        })
    })
}


