exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes, createFieldExtension } = actions
  createTypes(`type Mdx implements Node {
    frontmatter: Frontmatter
  }
  
  type Frontmatter @dontInfer {
      status: String
      title: String
      date: Date @dateformat
  }
  `)
}

exports.onCreateNode = ({ getNode, node, actions }) => {
  const { deleteNode, createNodeField } = actions
  if (node.internal.type === "Mdx") {
    if (node.frontmatter.status === "draft") {
      deleteNode({ node }, { name: "gatsby-plugin-mdx" })
    }
  }
}
