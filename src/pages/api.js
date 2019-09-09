import React from "react";
import { Link } from "gatsby";
import Layout from "../components/Layout";
import Wrapper from "../containers/page/Wrapper";
import { NavBar, Title } from "interra-data-catalog-components";
import ApiDocs from "../components/ApiDocs";
import links from "../assets/menu.json";

const ApiDocsFull = ({path}) => (
  <Layout path={path} title="DKAN API Documentation">
    <NavBar
      navItems={links.main.map((item) => (<Link activeClassName="active" to={item.url}>{item.label}</Link>))}
      customClasses="container-fluid main-navigation"  
    />
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
