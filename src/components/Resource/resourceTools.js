import { useState, useEffect, createContext } from "react";
import axios from "axios";
import datastore from "./datastore";

export const ResourceDispatch = createContext(null);

export const defaultResourceState = {
  columnOrder: [],
  columns: [],
  count: 0,
  currentPage: 0,
  density: "density-3",
  excludedColumns: {},
  filters: [],
  loading: false,
  pageSize: 20,
  queryAll: false,
  rowsTotal: 0,
  sort: [],
  store: null,
  values: []
};

export function resourceReducer(state, action) {
  switch (action.type) {
    case "GET_STORE":
      return {
        ...state,
        loading: true
      };
    case "NO_DATASTORE":
      return {
        ...state,
        storeType: null
      };
    case "USE_STORE":
      return {
        ...state,
        loading: false,
        store: action.data.store,
        storeType: action.data.storeType,
        columns: action.data.columns,
        rowsTotal: action.data.rowsTotal,
        queryAll: true
      };
    case "QUERY_STORE":
      return {
        ...state,
        loading: false,
        values: action.data.values,
        count: action.data.count,
        queryAll: false
      };
    case "UPDATE_PAGE":
      return {
        ...state,
        currentPage: action.data.page
      };
    case "UPDATE_FILTERS":
      return {
        ...state,
        filters: action.data.filters,
        currentPage: 0
      };
    case "UPDATE_PAGE_SIZE":
      return {
        ...state,
        pageSize: Number(action.data.pageSize),
        currentPage: 0
      };
    case "UPDATE_COLUMN_SORT":
      return {
        ...state,
        sort: action.data.sort
      };
    case "REORDER_COLUMNS":
      return {
        ...state,
        columnOrder: action.data.columnOrder
      };
    case "TOGGLE_COLUMNS":
      return {
        ...state,
        excludedColumns: action.data.excludedColumns
      };
    case "UPDATE_DENSITY":
      return {
        ...state,
        density: action.data.density
      };
    default:
      return "Not a valid action type.";
  }
}

// Build columns in correct structure for Datatable component.
export function prepareColumns(columns) {
  return columns.map(column => ({
    Header: column,
    accessor: column
  }));
}

// Get new rows of data from the datastore.
export async function queryResourceData(resourceData, includeCount = false) {
  const { filters, pageSize, currentPage, sort, store } = resourceData;
  const items = await store
    .query(filters, null, null, pageSize, currentPage, sort, includeCount)
    .then(data => data);
  console.log(items);
  return {
    type: "QUERY_STORE",
    data: {
      values: items.data,
      count: items.count
    }
  };
}

// Return all rows from the datastore.
export async function queryAllResourceData(store) {
  console.log(store);
  const items = await store
    .query(null, null, null, 0, null, null)
    .then(data => data);
  console.log(items);
  return {
    type: "QUERY_STORE",
    data: {
      values: items.data,
      count: items.count
    }
  };
}

// Create a new datastore using a CSV file.
export async function getFileDatastore(downloadURL) {
  // eslint-disable-next-line
  const store = await new datastore["file"](downloadURL);
  if (store) {
    const initCount = await store
      .query(null, null, null, 0, null, null, true)
      .then(data => data);
    const columns = prepareColumns(await store.getColumns());
    return {
      type: "USE_STORE",
      data: {
        store,
        rowsTotal: initCount,
        columns,
        storeType: "FILE"
      }
    };
  }
  return {
    type: "NO_DATASTORE"
  };
}

// Create a new datastore using the DKAN datastore.
export async function getDKANDatastore(rootURL, resource) {
  const { identifier } = resource;
  const checkForDatastore = await axios
    .get(`${rootURL}/datastore/imports/${identifier}`)
    .then(res => res.data)
    .catch(e => {
      // eslint-disable-next-line no-console
      console.warn(e.message);
    });
  if (checkForDatastore) {
    const { columns, numOfRows } = checkForDatastore;
    // eslint-disable-next-line
    const store = await new datastore["dkan"](identifier, columns, rootURL);
    return {
      type: "USE_STORE",
      data: {
        store,
        rowsTotal: numOfRows,
        columns: prepareColumns(columns),
        storeType: "DKAN",
        queryAll: true
      }
    };
  }
  return {
    type: "NO_DATASTORE"
  };
}

// Filter and reorder columns based on the toggled and reordered state.
// Use this to keep base columns in order so changes can be reset without
// extra queries to rebuild the data.
export function advancedColumns(
  columns = [],
  updatedColumns = [],
  excludedColumns = {}
) {
  const excludedArray = [];
  let newItems = columns;
  if (updatedColumns.length) {
    newItems = updatedColumns;
  }
  Object.keys(excludedColumns).forEach(key => {
    if (!excludedColumns[key]) {
      excludedArray.push(key);
    }
  });
  const columnOrder = newItems.reduce((reordered, item) => {
    if (!excludedArray.includes(item.accessor)) {
      reordered.push(item);
    }
    return reordered;
  }, []);
  return columnOrder;
}
