import React from "react";
import { Link } from "gatsby";
import { FontAwesomeIcon, NavBar, Title } from "interra-data-catalog-components";
import Layout from "../components/Layout";
import Wrapper from "../containers/page/Wrapper";
import links from "../assets/menu.json";

const About = ({path}) => (
  <Layout path={path} title="About">
    <NavBar
      navItems={links.main.map((item) => (<Link activeClassName="active" to={item.url}>{item.label}</Link>))}
      customClasses="container-fluid main-navigation"  
    />
    <Wrapper className="page container-fluid">
      <div className="section">
        <Title headerLevel="h1" title="About this site" />
        <div className="section-content">
          <div className="block">
            <p>This is the default state of the DKAN data catalog.</p>
            <p>This tool helps create open data catalogs using React and other libraries.</p>
          </div>
          <div className="block info">
            <p><FontAwesomeIcon icon="info-circle" fill="#27AAE1"/> Update this about page before publishing. </p>
          </div>
        </div>
      </div>
    </Wrapper>
  </Layout>
);

export default About;
