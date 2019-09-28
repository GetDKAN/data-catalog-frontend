import React from "react";
import { Blocks, Hero, IconList, StatBlock } from "interra-data-catalog-components";
import Layout from "../../components/Layout";
import IconListItem from "../../components/IconListItem";
import FeaturedDatasets from "../../containers/FeaturedDatasets";
import copy from "../../assets/copy.json";

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
