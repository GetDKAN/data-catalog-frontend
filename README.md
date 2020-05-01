# Data Catalog Frontend

This is a REACT frontend for [DKAN 2.x](https://github.com/GetDKAN/dkan).

This app serves as a starter App, or example of how to use the [data-catalog-components](https://github.com/GetDKAN/data-catalog-components) library to easily create open data catalogs.

This app is designed utilize the latest stable version of Drupal 8's version of [DKAN](https://github.com/GetDKAN/dkan) as a backend but can be modified to run off of other data catalog backends.


## Auto Set Up
1) Follow the [DKAN Tools](https://github.com/GetDKAN/dkan-tools) README to stand up the backend. Include the `--demo` flag to have the frontend installed and example pages built as well.

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

## Structure of the app

This is meant to be a blueprint for your frontend, from which you can make minor color and logo changes or major component or page layout customizations.

    ├── cypress           # Integration tests
    ├── public            # The output of the build process
    ├── src               # This directory will contain all of the source code
    |   ├── assets        # Place to store images and content/config files
    |   ├── components    # Configure your page structure wth the layout component
    │   ├── pages         # Components in this directory become pages automatically with paths based on their file name
    │   ├── services      # Provides the connections to the backend api
    |   └── templates     # Ideas for how you can assemble components to customize your pages
    │   └── theme         # Add your custom fonts, colors, and css here
    ├── .env.development  # Local environment variables
    ├── .env.production   # Production environment variables
    ├── gatsby-browser.js # Customizations affecting the browser
    ├── gatsby-config.js  # The main configuration file
    ├── gatsby-node.js    # Customizations affecting the site build process
    ├── gatsby-ssr.js     # Customizations affecting server-side rendering
    ├── package.json      # App dependencies
    └── providers.js      # Component that wraps your root element
