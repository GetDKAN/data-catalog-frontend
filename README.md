# Data Catalog Frontend

This is a REACT frontend for [DKAN 2.x](https://github.com/GetDKAN/dkan).

This app serves as a starter App, or example of how to use the [data-catalog-components](https://github.com/GetDKAN/data-catalog-components) library to easily create open data catalogs.

This app is designed utilize the latest stable version of Drupal 8's version of [DKAN](https://github.com/GetDKAN/dkan) as a backend but can be modified to run off of other data catalog backends.


## Auto Set Up
1) Follow the [DKAN Tools](https://github.com/GetDKAN/dkan-tools) README to stand up the backend. Include the `--frontend` flags to have the frontend installed as well.

## Manual Set Up
If you have a backend already running and just need the frontend:

1) Install the Gatsby CLI ``npm install -g gatsby-cli``
1) Clone this repository in your docroot
1) Install the dependencies with [npm](https://www.npmjs.com/):
   1) ``cd data-catalog-frontend``
   1) ``npm install``
1) Run the server: ``npm start`` or ``gatsby develop``
   1) Your site is now running at ``http://localhost:8000``
1) Build the public files ``npm run build`` or ``gatsby build``



## Learn More

You can learn more in the [Gatsby.js documentation](https://www.gatsbyjs.org/docs).

To learn React, check out the [React documentation](https://reactjs.org/).
