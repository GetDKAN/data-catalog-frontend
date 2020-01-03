import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import Layout from "../../components/Layout";
import Tags from "../../components/Tags";
import TopicImage from "../../components/TopicImage";
import Resource from "../../components/Resource";

import {
  Title,
  Text,
  Organization,
  Table
} from "@civicactions/data-catalog-components";

const Dataset = props => {
  const item = props.pageContext.dataset;
  const path = props.path;

  const [hasWindow, checkForWindow] = useState(false);

  useEffect(() => {
    if (window !== undefined) {
      checkForWindow(true);
    }
  }, []);

  const orgName =
    "publisher" in item && item.publisher ? item.publisher.data.name : "";
  const orgImage =
    "publisher" in item && item.publisher ? item.publisher.data.image : "";
  const orgDesc =
    "publisher" in item && item.publisher
      ? item.publisher.data.description
      : "";
  const tag = "keyword" in item ? item.keyword : [];
  const theme = "theme" in item ? item.theme : [];
  const columns = "columns" in item ? item.columns : [];

  function themes(theme) {
    if (!theme) {
      return null;
    } else {
      return theme.map(topic => {
        return (
          <Link
            key={`dist-${topic.identifier}-${Math.random() * 10}`}
            to={"search?topics=" + topic.data}
          >
            <TopicImage title={topic.data} height="16" width="16" />
            {topic.data}
          </Link>
        );
      });
    }
  }

  // Process content for 'Columns in this Dataset' table.
  const labelsT2 = {};
  const valuesT2 = {};

  columns.forEach((value, index) => {
    labelsT2[index] = { label: value };
    valuesT2[index] = "String";
  });

  // Process content for 'Additional Information' table.
  const labelsT3 = {};
  const valuesT3 = {};

  if (orgName && orgName.length > 0) {
    labelsT3.publisher = { label: "Publisher" };
    valuesT3.publisher = orgName;
  }
  if ("identifier" in item && item.identifier) {
    labelsT3.identifier = { label: "Identifier" };
    valuesT3.identifier = item.identifier;
  }
  if ("issued" in item && item.issued) {
    labelsT3.issued = { label: "Issued" };
    valuesT3.issued = item.issued;
  }
  if ("modified" in item && item.modified) {
    labelsT3.modified = { label: "Last Update" };
    valuesT3.modified = item.modified;
  }
  if ("contactPoint" in item && item.contactPoint && item.contactPoint.fn) {
    labelsT3.contact = { label: "Contact" };
    valuesT3.contact = item.contactPoint.fn;
  }
  if (
    "contactPoint" in item &&
    item.contactPoint &&
    item.contactPoint.hasEmail
  ) {
    labelsT3.email = { label: "Contact E-mail" };
    valuesT3.email = `<a href="${item.contactPoint.hasEmail}">${item.contactPoint.hasEmail}</a>`;
  }
  if ("accessLevel" in item && item.accessLevel) {
    labelsT3.access = { label: "Public Access Level" };
    valuesT3.access = item.accessLevel;
  }
  if ("landingPage" in item && item.landingPage) {
    labelsT3.homepage = { label: "Homepage URL" };
    valuesT3.homepage = `<a href="${item.landingPage}">${item.landingPage}</a>`;
  }

  return (
    <Layout path={path} title={item.title}>
      <div className="dataset-page container-fluid">
        <div className="row">
          <div className="col-md-3 col-sm-12 p-5">
            <Organization
              name={orgName}
              imageUrl={orgImage}
              description={orgDesc}
            />
            <div className="block-wrapper">
              The information on this page is also available via the{" "}
              <Link to={`dataset/${item.identifier}/api`}>API</Link>.
            </div>
          </div>
          <div className="results-list col-md-9 col-sm-12 p-5">
            <Title title={item.title} />
            {theme && <div className="item-theme">{themes(theme)}</div>}
            <Text value={item.description} />
            {hasWindow &&
              item.distribution.map(dist => {
                return <Resource resource={dist} identifier={1} />;
              })}
            <Tags tags={tag} path="/search?keyword=" />
            <Table
              configuration={labelsT2}
              data={valuesT2}
              title="Columns in this Dataset"
              th1="Column Name"
              th2="Type"
              tableclass="table-two"
            />
            <Table
              configuration={labelsT3}
              data={valuesT3}
              tableclass="table-three"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dataset;
