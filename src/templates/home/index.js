import React from "react";
import { 
  Blocks, 
  Hero,    
  StatBlock } from "@civicactions/data-catalog-components";
import IconList from "../../components/IconList";
import IconListItem from "../../components/IconListItem";
import Layout from '../../components/Layout';
import FeaturedDatasets from '../../containers/FeaturedDatasets';
import copy from '../../assets/copy.json';
//
const Home = ({ pageContext: { themes }, path }) => {
  const items = themes.map(x => {
    let item = {
      identifier: x.identifier,
      ref: `search?theme=${x.data}`,
      title: x.data,
      size: "100"
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
          />
          <Blocks items={copy.stats} component={StatBlock} className="StatBlock" />
          <FeaturedDatasets /> 
        </div>
      </Layout>
    );
};

export default Home;
