import React from "react";
//import { 
  // Blocks,    
  // StatBlock } from "@civicactions/data-catalog-components";
import Hero from '../../components/Hero';
import IconList from "../../components/IconList";
import IconListItem from "../../components/IconListItem";
import Layout from '../../components/Layout';
//import FeaturedDatasets from '../../containers/FeaturedDatasets';
import copy from '../../assets/copy.json';
//
const Home = ({ pageContext: { themes, featuredDatasets }, path }) => {
  const items = themes.map(x => {
    let item = {
      identifier: x.identifier,
      ref: `search?topics=${x.data}`,
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
        </div>
      </Layout>
    );
};

export default Home;
