import React from "react";
import { Link } from "gatsby";
import Layout from "../components/Layout";
import Wrapper from "../containers/page/Wrapper";
import { FontAwesomeIcon, NavBar } from "interra-data-catalog-components";
import links from "../assets/menu.json";

const Groups = ({path}) => (
  <Layout path={path} title="Publishers">
    <NavBar
      navItems={links.main.map((item) => (<Link activeClassName="active" to={item.url}>{item.label}</Link>))}
      customClasses="container-fluid main-navigation"  
    />
    <Wrapper className="page container-fluid">
      <div className="section">
        <h1>Dataset Publishers</h1>
        <div className="section-content">
          <div className="block">
            <p>Groups allow you to classify datasets that share a common publisher or organizational group 
              (i.e. Parks and Recreation Department, Department of Education). Behind the scenes, Groups can 
              offer an additional set of roles and permissions that ensure quality and security when publishing data. 
              This is especially important for large sites that may have several working groups publishing data to the 
              same site.
            </p>
          </div>
          <div className="block info">
              <p><FontAwesomeIcon icon="info-circle" fill="#27AAE1"/> Update this with text specific to your site. </p>
          </div>
        </div>
      </div>
    </Wrapper>
  </Layout>
);

export default Groups;
