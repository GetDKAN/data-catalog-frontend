import React from "react";
import Layout from "../components/Layout";
import Wrapper from "../containers/page/Wrapper";

export default ({ path }) => (
  <Layout path={path} title="Page not found">
    <Wrapper className="page container-fluid">
      <h1>Page not found.</h1>
    </Wrapper>
  </Layout>
);
