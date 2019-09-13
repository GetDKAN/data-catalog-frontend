const path = require('path');
const axios = require('axios').default;

exports.createPages = async ({ actions: { createPage } }) => {
  const { data: collections } = await axios.get('http://dkan/api/v1/theme');
  const { data: jsonData } = await axios.get('http://dkan/api/v1/dataset');

  createPage({
    path: `/`,
    component: path.resolve('./src/templates/home/index.js'),
    context: { collections }
  })

  createPage({
    path: `/search`,
    component: path.resolve('./src/templates/search/index.js'),
    context: {  }
  })

  await Promise.all(jsonData.map(data => {
    return new Promise((resolve, reject) => {
      axios.get(`http://dkan/api/v1/dataset/${data.identifier}?values=both`)
      .then(function (response) {
        // handle success
        resolve(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error)
        resolve(data);
      })
    });
  }))
  .then(results => {
    results.forEach((dataset) => {
      createPage({
        path: `/dataset/${dataset.identifier}`,
        component: path.resolve('./src/templates/dataset/index.js'),
        context: { dataset }
      });
      createPage({
        path: `/dataset/${dataset.identifier}/api`,
        component: path.resolve('./src/templates/dataset/api.js'),
        context: { dataset }
      })
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
