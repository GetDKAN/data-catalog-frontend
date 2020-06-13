import React from 'react';

export const defaultFacets = {
  "theme": {
    "label": "Topics",
    "field": "theme.0.title",
    "showAll": false,
    "limit": 10,
    "reset": {
      "active": false,
      "icon": <span></span>
    },
  },
  "keyword": {
    "label": "Tags",
    "field": "keyword.*.title",
    "showAll": false,
    "limit": 10,
    "reset": {
      "active": false,
      "icon": <span></span>
    },
  },
  "publisher__name": {
    "label": "Publishers",
    "field": "publisher__name",
    "showAll": false,
    "limit": 10,
    "reset": {
      "active": false,
      "icon": <span></span>
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
      Object.prototype.hasOwnProperty.call(x.publisher, "name")
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
