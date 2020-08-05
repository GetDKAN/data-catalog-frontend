import React from "react";
import {
  Blocks,
  Hero,
  IconList,
  IconListItem,
  StatBlock
} from "@civicactions/data-catalog-components";
import Layout from "../../components/Layout";
import FeaturedDatasets from "../../templates/FeaturedDatasets";
import copy from "../../assets/copy.json";

const Home = ({ pageContext: { themes, featuredDatasets }, path }) => {
  const items = themes.map(x => {
    let item = {
      identifier: x.identifier,
      ref: `search?theme=${x.data}`,
      title: x.data,
      size: "100"
    };
    return item;
  });
  return (
    <Layout path={path} title="Home">
      <div className="home-page">
        <Hero title={copy.hero[0].title} intro={copy.hero[0].intro} gradient="#162e51,#0978bc" />
        <IconList
          items={items}
          component={IconListItem}
          paneTitle="Dataset Topics"
          className="opendata-icon-list"
        />
        <div className="container-fluid StatBlock">
          <Blocks
            items={copy.stats}
            component={StatBlock}
            containerClass="container"
          />
        </div>
        <FeaturedDatasets datasets={featuredDatasets} />
      </div>
    </Layout>
  );
};

export default Home;
