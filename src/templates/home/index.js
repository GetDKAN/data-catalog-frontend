import React from "react";
import { Link } from "gatsby";
import { Blocks, Hero, IconList, NavBar, StatBlock } from "interra-data-catalog-components";
import Layout from "../../components/Layout";
import IconListItem from "../../components/IconListItem";
import FeaturedDatasets from "../../containers/FeaturedDatasets";
import copy from "../../assets/copy.json";
import links from "../../assets/menu.json";

const Home = ({ pageContext: { collections }, path }) => {
  const items = collections.map(x => {
    let item = {
      identifier: x.identifier,
      ref: `search?theme=${x.data}`,
      icon: x.data,
      title: x.data
      };
      return item;
    })
    return (
      <Layout path={path} title="Home">
        <NavBar
          navItems={links.main.map((item) => (<Link activeClassName="active" to={item.url}>{item.label}</Link>))}
          customClasses="container-fluid main-navigation"  
        />
        <div className="home-page">
          <Hero title={copy.hero[0].title} intro={copy.hero[0].intro} />
          <IconList 
            items={ items }
            component={IconListItem}
            paneTitle="Dataset Topics"
            className="opendata-icon-list"
            color="#ff0000"
          />
          <Blocks items={copy.stats} component={StatBlock} className="StatBlock" />
          <FeaturedDatasets />
        </div>
      </Layout>
    );
};

export default Home;
