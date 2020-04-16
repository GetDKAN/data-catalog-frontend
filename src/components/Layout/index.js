import React from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { Header, NavBar, Footer } from "@civicactions/data-catalog-components";
import config from "../../assets/config.json";
import links from "../../assets/menu.json";

const Layout = ({ children, path, title, customClasses }) => {
  return (
    <div className="App">
      <Helmet
        title={`${title} - DKAN Demo`}
        defer={false}
        htmlAttributes={{
          "lang": "en"
        }}
      />
      <Header site={config.site} slogan={config.slogan} customClasses={config.container} />
      <NavBar
        navItems={links.main.map(item => (
          <Link activeClassName="active" to={item.url}>
            {item.label}
          </Link>
        ))}
        customClasses={config.container}
      />
      <main>{children}</main>
      <Footer links={links} customClasses={config.container} />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
