require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})
const path = require('path');
const axios = require('axios');

exports.createPages = async ({ actions: { createPage } }) => {
  const { data: themes } = await axios.get(`${process.env.GATSBY_API_URL}/metastore/schemas/theme/items`);
  const { data: datasets } = await axios.get(`${process.env.GATSBY_API_URL}/metastore/schemas/dataset/items?show-reference-ids`);
  const { data: dataStories } = await axios.get(`${process.env.DRUPAL_API_URL}/node/data_story`);
  const buildDate = new Date().toISOString()
  console.log(dataStories)
  let featuredDatasets = datasets.sort(function(a,b) {
    return a.title - b.title;
  });

  featuredDatasets = featuredDatasets.length > 3 ? featuredDatasets.slice(featuredDatasets.length -3, featuredDatasets.length) : featuredDatasets;

  createPage({
    path: `/`,
    component: path.resolve('./src/templates/home/index.js'),
    context: { themes, featuredDatasets }
  });

  createPage({
    path: `/search`,
    component: path.resolve('./src/templates/search/index.jsx')
  });

  datasets.map((item) => {
    createPage({
      path: `/dataset/${item.identifier}`,
      // component: path.resolve('./src/templates/dataset/index.jsx'),
      component: path.resolve('./src/pages/dataset.js'),
      context: { item, buildDate }
    })

    // createPage({
    //   path: `/dataset/${item.identifier}/api`,
    //   component: path.resolve('./src/templates/dataset/api.js'),
    //   // component: path.resolve('./src/pages/dataset.js'),
    //   context: { item }
    // })
  })
  dataStories.data.map((item) => {
    console.log(buildDate, item)
    createPage({
      path: `/story${item.attributes.path.alias}`,
      // component: path.resolve('./src/templates/dataset/index.jsx'),
      component: path.resolve('./src/pages/story.js'),
      context: { item, buildDate }
    })

    // createPage({
    //   path: `/dataset/${item.identifier}/api`,
    //   component: path.resolve('./src/templates/dataset/api.js'),
    //   // component: path.resolve('./src/pages/dataset.js'),
    //   context: { item }
    // })
  })
}

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  // Only update the `/app` page.
  if (page.path.match(/^\/dataset/)) {
    // page.matchPath is a special key that's used for matching pages
    // with corresponding routes only on the client.
    page.matchPath = "/dataset/*"
    // Update the page.
    createPage(page)
  }
  // if (page.path.match(/^\/story/)) {
  //   // page.matchPath is a special key that's used for matching pages
  //   // with corresponding routes only on the client.
  //   page.matchPath = "/story/*"
  //   // Update the page.
  //   createPage(page)
  // }
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
