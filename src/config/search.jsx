import React from 'react';

export const defaultFacets = {
  "Theme": {
    "label": "Topics",
    "field": "theme.0.title",
    "showAll": true,
    "facetType": "radio",
    "limit": 50,
    "reset": {
      "active": false,
      "icon": <p>blah</p>
    },
  },
  "Keyword": {
    "label": "Tags",
    "field": "keyword.*.title",
    "showAll": false,
    "limit": 10,
    "reset": {
      "active": false,
      "icon": <p>blah</p>
    },
  }
}

export function normalizeItems(resultItems) {
  let nItems = resultItems;
  if (!Array.isArray(nItems)) {
    nItems = Object.values(nItems);
  }
  return nItems.map((x) => {
    let item = {};
    item = {
      identifier: x.identifier,
      modified: x.modified,
      description: x.description,
      theme: x.theme,
      format: x.distribution,
      title: x.title,
      ref: `/dataset/${x.identifier}`
    };
    if (
      Object.prototype.hasOwnProperty.call(x, "publisher") &&
      Object.prototype.hasOwnProperty.call(x, "name")
    ) {
      item.publisher = x.publisher.name;
    } else {
      item.publisher = "";
    }
    return item;
  });
}

export const sortOptions = [
  {
    field: 'modified',
    order: 'desc',
    label: 'Date'
  },
  {
    field: 'title',
    order: 'asc',
    label: 'Alphabetical'
  }
];