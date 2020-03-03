import React from "react";
import Layout from "../components/Layout";
import config from "../assets/config";
import { ApiDocs } from "@civicactions/data-catalog-components";

const ApiDocsFull = ({ path }) => (
  <Layout path={path} title="DKAN API Documentation">
    <div className={`dc-page ${config.container}`}>
      <div className="page-content">
        {typeof window !== `undefined` && (
          <ApiDocs endpoint={process.env.GATSBY_API_URL} />
        )}
      </div>
    </div>
  </Layout>
);

export default ApiDocsFull;
