require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})
const path = require('path');
const axios = require('axios');

exports.createPages = async ({ actions: { createPage } }) => {
  const { data: themes } = await axios.get(`${process.env.GATSBY_API_URL}/metastore/schemas/theme/items`);
  const { data: datasets } = await axios.get(`${process.env.GATSBY_API_URL}/metastore/schemas/dataset/items`);

  let featuredDatasets = datasets.sort(function(a,b) {
    return a.title - b.title;
  });

  featuredDatasets = featuredDatasets.length > 3 ? featuredDatasets.slice(featuredDatasets.length -3, featuredDatasets.length) : featuredDatasets;

  createPage({
    path: `/`,
    component: path.resolve('./src/templates/home/index.js'),
    context: { themes, featuredDatasets }
  })

  createPage({
    path: `/search`,
    component: path.resolve('./src/templates/search/index.js'),
    context: { themes }
  })

  // await Promise.all(jsonData.map(data => {
  //   return new Promise((resolve, reject) => {
  //     axios.get(`http://dkan/api/v1/datastore/${data.identifier}?values=both`)
  //     .then(function (response) {
  //       // handle success
  //       resolve(response.data);
  //     })
  //     .catch(function (error) {
  //       // handle error
  //       resolve(data);
  //     })
  //   });
  // }))
  // .then(results => {
  //   results.forEach((dataset) => {
  //     createPage({
  //       path: `/dataset/${dataset.identifier}`,
  //       component: path.resolve('./src/templates/dataset/index.js'),
  //       context: { dataset }
  //     });
  //     createPage({
  //       path: `/dataset/${dataset.identifier}/api`,
  //       component: path.resolve('./src/templates/dataset/api.js'),
  //       context: { dataset }
  //     })
  //   })
  // })
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
