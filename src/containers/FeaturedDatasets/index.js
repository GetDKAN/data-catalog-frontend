import React from "react";
import PropTypes from "prop-types";
import Wrapper from "./Wrapper";
import { SearchList } from "@civicactions/data-catalog-components";

const FeaturedDatasets = ({ datasets }) => {
  const items = datasets.map(x => {
    let id = "identifier" in x ? x.identifier : "";
    let item = {
      publisher: "publisher" in x ? x.publisher.name : "",
      identifier: { id },
      modified: "modified" in x ? x.modified : "",
      description: "description" in x ? x.description : "",
      theme: "theme" in x ? x.theme : "",
      format: "distribution" in x ? x.distribution : "",
      title: "title" in x ? x.title : "",
      ref: `/dataset/${id}`
    };
    return item;
  });
  return (
    <Wrapper className="container-fluid">
      <h2 className="section-title">Featured Datasets</h2>
      <div className="section-content">
        <SearchList>
          {/* TODO Add new Search List Item */}
          {items.map(item => {
            return <li>{item.title}</li>;
          })}
        </SearchList>
      </div>
    </Wrapper>
  );
};

FeaturedDatasets.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object)
};

export default FeaturedDatasets;
