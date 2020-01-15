import React, { useState, useEffect, useReducer } from "react";
import Loader from "react-loader-advanced";
import LoadingSpin from "react-loading-spin";
import Layout from "../../components/Layout";
import Wrapper from "./Wrapper";
import SearchContent from "./components/SearchContent";
import SearchSidebar from "./components/SearchSidebar";
import queryString from "query-string";

import {
  PageHeader,
  SearchDispatch,
  defaultSearchState,
  searchReducer,
  getLunrSearch,
  buildInitialFacets
} from "@civicactions/data-catalog-components";

export function normalizeItems(resultItems) {
  return resultItems.map(x => {
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

const defaultFacets = {
  Topics: {
    label: "Topics",
    field: "theme.0.title",
    showAll: false
  },
  Tags: {
    label: "Tags",
    field: "keyword.*.title",
    showAll: false
  }
};

const Search = ({ path, location }) => {
  const [totalFacetsList, setTotalFacetsList] = useState(null);
  const [hasWindow, setHasWindow] = useState(false);

  // Initialize the useReducer hook using the imported searchState and reducer.
  const [searchState, dispatch] = useReducer(searchReducer, defaultSearchState);
  const { loading, items, searchURL, query, page, pageSize } = searchState;

  // Fetch data on mount and when query changes.
  useEffect(() => {
    const promise = getData(query, page, pageSize);
    promise.then((info) => {
      const normalItems = normalizeItems(info.results);
      dispatch({
        type: 'GET_SEARCH_DATA',
        data: {
          totalItems: info.total,
          items: normalItems,
          facetsResults: {}
        }});
    });

  }, [query, page, pageSize]);

  async function getData(query, page, pageSize) {
    const axios = require('axios').default;
    const response = await axios.get(`${process.env.GATSBY_API_URL}/search?fulltext=` + query +"&page=" + page + "&pageSize=" + pageSize);
    return response.data;
  }

  // This useEffect hook contains only the functions we want to run
  // when the component is mounted. It won't run on subsequent rerenders.
  useEffect(() => {
    // Set initial variables that aren't part of the our imported searchState.
    const initialParams = queryString.parse(location.search);
    if (window !== undefined) {
      setHasWindow(true);
    }
    dispatch({ type: "FETCH_DATA" });
    dispatch(buildInitialFacets(initialParams, defaultFacets));
    async function getSearchEngine() {
      dispatch(
        await getLunrSearch(
          `${process.env.DYNAMIC_API_URL}/lunr/search-index.json`,
          defaultFacets
        )
      );
    }
    getSearchEngine();
  }, [location]);

  // This one can probably be grouped in another useEffect hook,
  // but it also made since to just leave it here since it is doing
  // all the manipulation of the browser history.
  useEffect(() => {
    if (window !== undefined && searchURL !== undefined) {
      window.history.pushState({}, "Search", `${searchURL}`);
    }
  }, [searchURL]);

  return (
    <Layout path={path} title="Search">
      <Wrapper className="search-page containter-fluid m-5">
        <div className="row">
          <PageHeader title="Datasets" />
        </div>
        <SearchDispatch.Provider
          value={{ searchState, dispatch, totalFacetsList, defaultFacets }}
        >
          {hasWindow && (
            <Loader
              hideContentOnLoad
              backgroundStyle={{ backgroundColor: "#f9fafb" }}
              foregroundStyle={{ backgroundColor: "#f9fafb" }}
              show={loading}
              message={<LoadingSpin width={"3px"} primaryColor={"#007BBC"} />}
            >
              {items && (
                <div className="row">
                  <SearchContent />
                  <SearchSidebar />
                </div>
              )}
            </Loader>
          )}
        </SearchDispatch.Provider>
      </Wrapper>
    </Layout>
  );
};

export default Search;
