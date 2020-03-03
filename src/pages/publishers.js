import React, { useState, useEffect } from "react";
import axios from "axios";
import { PublisherList } from "@civicactions/data-catalog-components";
import Layout from "../components/Layout";
import config from "../assets/config";
import orgs from "../assets/publishers";

const Publishers = ({ path }) => {

  // let [data, setData] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.GATSBY_API_URL}/metastore/schemas/publisher/items`)
  //     .then(response => setData(response.data));
  // }, []);

  // const list = data.map((x) => {

  //   const details = orgs.filter(org => x.data.name === org.name);
  //   let item = {};
  //   if (details !== undefined) {
  //     item = {
  //       identifier: x.identifier,
  //       name: x.data.name,
  //       description: x.data.description ? x.data.description : details[0].description,
  //       imageUrl: x.data.imageUrl ? x.data.imageUrl : details[0].imageUrl
  //     };
  //   }
  //   return item;
  // });

  return (
    <Layout path={path} title="Publishers">
      <div className={`dc-page ${config.container}`}>
        <h1>Dataset Publishers</h1>
        <div className="dc-page">
          <p>
            Groups allow you to classify datasets that share a common
            publisher or organizational group (i.e. Parks and Recreation
            Department, Department of Education). Behind the scenes, Groups
            can offer an additional set of roles and permissions that ensure
            quality and security when publishing data. This is especially
            important for large sites that may have several working groups
            publishing data to the same site.
          </p>

          <PublisherList items = {orgs} />

        </div>
      </div>
    </Layout>
  );
}

export default Publishers;
