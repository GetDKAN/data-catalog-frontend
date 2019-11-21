import React from "react";
import Layout from "../components/Layout";
import Wrapper from "../containers/page/Wrapper";
import { Title, ApiDocs } from "@civicactions/data-catalog-components";

const ApiDocsFull = ({path}) => (
  <Layout path={path} title="DKAN API Documentation">
    <Wrapper className="page container-fluid">
      <div className="section">
        <Title title="DKAN API Documentation" headerLevel="h1" />
        <div className="section-content">
          {typeof window !== `undefined` &&
            <ApiDocs
              endpoint={ process.env.GATSBY_API_URL }
            />
          }
        </div>
      </div>
    </Wrapper>
  </Layout>
);

export default ApiDocsFull;
