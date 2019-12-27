import React from "react";
import { Title } from "@civicactions/data-catalog-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "../components/Layout";
import Wrapper from "../containers/page/Wrapper";

const About = ({ path }) => (
  <Layout path={path} title="About">
    <Wrapper className="page container-fluid">
      <div className="section">
        <Title headerLevel="h1" title="About this site" />
        <div className="section-content">
          <div className="block">
            <p>This is the default state of the DKAN data catalog.</p>
            <p>
              This tool helps create open data catalogs using React and other
              libraries.
            </p>
          </div>
          <div className="block info">
            <p>
              <FontAwesomeIcon icon="info-circle" color="#27AAE1" /> Update this
              about page before publishing.{" "}
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  </Layout>
);

export default About;
