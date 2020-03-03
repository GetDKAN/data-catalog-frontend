import React from "react";
import PropTypes from "prop-types";
import { Link } from '@reach/router';
import { SearchList, SearchListItem } from "@civicactions/data-catalog-components";
import config from "../../assets/config";

const FeaturedDatasets = ({ datasets }) => {

  const items = datasets.map(x => {
    let id = "identifier" in x ? x.identifier : "";
    let item = {
      identifier: { id },
      modified: "modified" in x ? x.modified : "",
      description: "description" in x ? x.description : "",
      theme: "theme" in x ? x.theme.data : [],
      format: "distribution" in x ? x.distribution : "",
      title: "title" in x ? x.title : "",
      ref: `/dataset/${id}`,
      publisher: "",
    };
    if (
      Object.prototype.hasOwnProperty.call(x, "publisher") &&
      Object.prototype.hasOwnProperty.call(x.publisher, "data") &&
      Object.prototype.hasOwnProperty.call(x.publisher.data, "name")
    ) {
      item.publisher = x.publisher.data.name;
    }
    return item;
  });
  return (
    <div className={`dc-featured-datasets ${config.container}`}>
      <h2>Featured Datasets</h2>
      <ol>
        {datasets.map((item) => (
          <li>
            <Link to={`dataset/${item.identifier}`} key={item.identifier}>
              <h3>{item.title}</h3>
            </Link>
          </li>
          //<SearchListItem key={item.identifier} item={item} />
        ))}
      </ol>
    </div>
  );
};

FeaturedDatasets.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object)
};

export default FeaturedDatasets;
