import React from "react";
import PropTypes from "prop-types";
import excerpts from 'excerpts';
import { Link } from '@reach/router';
import { SearchList, SearchListItem, Text } from "@civicactions/data-catalog-components";
import config from "../../assets/config";

const FeaturedDatasets = ({ datasets }) => {
  // export function normalizeItems(resultItems) {
  //   let nItems = resultItems;
  //   if (!Array.isArray(nItems)) {
  //     nItems = Object.values(nItems);
  //   }
  //   return nItems.map((x) => {
  //     let item = {};
  //     item = {
  //       identifier: x.identifier,
  //       modified: x.modified,
  //       description: x.description,
  //       theme: x.theme,
  //       format: x.distribution,
  //       title: x.title,
  //       ref: `/dataset/${x.identifier}`
  //     };
  //     if (
  //       Object.prototype.hasOwnProperty.call(x, "publisher") &&
  //       Object.prototype.hasOwnProperty.call(x.publisher, "name")
  //     ) {
  //       item.publisher = x.publisher.name;
  //     } else {
  //       item.publisher = "";
  //     }
  //     return item;
  //   });
  // }

  const items = datasets.map(x => {


    let id = "identifier" in x ? x.identifier : "";
    let item = {
      identifier: { id },
      modified: "modified" in x ? x.modified : "",
      description: "description" in x ? x.description : "",
      theme: "theme" in x ? x.theme : [],
      format: "distribution" in x ? x.distribution : [],
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
    console.log('item: ', item);
    console.log('x: ', x);
    return item;
  });
  return (
    <div className={`dc-featured-datasets ${config.container}`}>
      <h2 className="dc-featured-title">Featured Datasets</h2>
      <ol>
        {datasets.map((item) => (
          <li>
            <Link to={`dataset/${item.identifier}`} key={item.identifier}>
              <h3>{item.title}</h3>
            </Link>
            <Text>
              {excerpts(item.description, {words: 35})}
            </Text>
          </li>
          // <SearchListItem key={item.identifier} item={item} />
        ))}
      </ol>
    </div>
  );
};

FeaturedDatasets.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object)
};

export default FeaturedDatasets;
