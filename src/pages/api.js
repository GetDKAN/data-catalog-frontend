import React from "react";
import Layout from "../components/Layout";
import Wrapper from "../containers/page/Wrapper";
import { ApiDocs, Title } from "@civicactions/data-catalog-components";
//import ApiDocs from "../components/ApiDocs";

const ApiDocsFull = ({path}) => (
  <Layout path={path} title="DKAN API Documentation">
    <Wrapper className="page container-fluid">
      <div className="section">
        <Title title="DKAN API Documentation" headerLevel="h1" />
        <div className="section-content">
          {typeof window !== `undefined` &&
            <ApiDocs />
          }
        </div>
      </div>
    </Wrapper>
  </Layout>
);

export default ApiDocsFull;
