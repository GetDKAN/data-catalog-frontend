import React from "react";
import Layout from "../components/Layout";
import Wrapper from "../containers/page/Wrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Groups = ({ path }) => (
  <Layout path={path} title="Publishers">
    <Wrapper className="page container-fluid">
      <div className="section">
        <h1>Dataset Publishers</h1>
        <div className="section-content">
          <div className="block">
            <p>
              Groups allow you to classify datasets that share a common
              publisher or organizational group (i.e. Parks and Recreation
              Department, Department of Education). Behind the scenes, Groups
              can offer an additional set of roles and permissions that ensure
              quality and security when publishing data. This is especially
              important for large sites that may have several working groups
              publishing data to the same site.
            </p>
          </div>
          <div className="block info">
            <p>
              <FontAwesomeIcon icon="info-circle" color="#27AAE1" /> Update this
              with text specific to your site.{" "}
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  </Layout>
);

export default Groups;
