/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { NavBar, Footer } from "@civicactions/data-catalog-components";
import Header from "../Header";
import links from "../../assets/menu.json";

const Layout = ({ children, path, title }) => {
  return (
    <div className="App">
      <Helmet title={`${title} - DKAN Demo`} defer={false} />
      <Header path={path} />
      <NavBar
        navItems={links.main.map(item => (
          <Link activeClassName="active" to={item.url}>
            {item.label}
          </Link>
        ))}
        customClasses="container-fluid main-navigation"
      />
      <main>{children}</main>
      <Footer links={links} />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
