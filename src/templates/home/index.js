import React from "react";
import Blocks from "../../components/Blocks";
import Hero from '../../components/Hero';
import image from '../../assets/images/hero.png';
import Layout from "../../components/Layout";
import copy from "../../assets/copy.json";

const Home = ({ path }) => {
  return (
    <Layout path={path} title="Home">
      <div className="home-page">
        <Hero 
          title={copy.hero[0].title} 
          intro={copy.hero[0].intro} 
          image={image}
        />
        <Blocks 
          items={copy.how} 
          paneTitle="How it works" 
          className="container block-container how 4-col" 
        />
        <div className="block-container-fluid">
          <Blocks 
            items={copy.what} 
            paneTitle="What's trending" 
            className="container block-container what 4-col" 
          />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
