import React from "react";
import Layout from "../components/Layout";
import config from "../assets/config";

export default ({ path }) => (
  <Layout path={path} title="Page not found">
    <div className={`dc-page ${config.container}`}>
      <h1>Page not found.</h1>
    </div>
  </Layout>
);
