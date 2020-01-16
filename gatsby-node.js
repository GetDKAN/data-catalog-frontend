require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})
const path = require('path');
const axios = require('axios');

exports.createPages = async ({ actions: { createPage } }) => {

  const { data: datasets } = await axios.get(`${process.env.GATSBY_API_URL}/metastore/schemas/dataset/items`);

  createPage({
    path: `/`,
    component: path.resolve('./src/templates/home/index.js'),
  });

  createPage({
    path: `/search`,
    component: path.resolve('./src/templates/search/index.jsx')
  });

  datasets.map((dataset) => {
    createPage({
      path: `/dataset/${dataset.identifier}`,
      component: path.resolve('./src/templates/dataset/index.jsx'),
      context: { dataset }
    })

    createPage({
      path: `/dataset/${dataset.identifier}/api`,
      component: path.resolve('./src/templates/dataset/api.js'),
      context: { dataset }
    })
  })
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /react-loader-advanced/,
            use: loaders.null(),
          },
          {
            test: /react-loading-spin/,
            use: loaders.null(),
          },
          {
            test: /swagger-ui-react/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
