import React, { Component } from "react";
import { Link } from "gatsby";
import Loader from "react-loader-advanced";
import LoadingSpin from "react-loading-spin";
import { PageHeader, SearchList } from "@civicactions/data-catalog-components";
import { Select, FormLabel } from "@cmsgov/design-system-core";
import FacetList from "../../components/FacetList";
import search from "../../services/search";
import backend from "../../services/backend";
import Layout from "../../components/Layout";
import Pagination from "react-js-pagination";
import StyledPagination from "../../theme/pagination.js"
import SearchInput from "./SearchInput";
import Wrapper from "./Wrapper";

const InitialState = {
    items: [{
      title: "loading",
      description: "loading"
    }],
    show: true,
    page: 1,
    pageSize: 10,
    total: 0,
    term : "",
    sort: "alpha",
    searchEngine: false,
    facetsResults: {
      theme: [],
      keyword: []
    },
    facets: {
      "theme": {
        "label": "Topics",
        "field": "theme.*.title",
        "showAll": false
      },
      "keyword": {
        "label": "Tags",
        "field": "keyword.*.title",
        "showAll": false
      }
    },
  }

class Search extends Component {

  constructor(props) {
    super(props);

    // Retrieve the last state
    this.state = InitialState;
  }

  async initSearch() {
    const { facets } = this.state;
    const searchType = 'Lunr';
    const searchEngine = new search[searchType]();
    const { data } = await backend.get("/search-index.json");
    await searchEngine.init(data, facets);

    this.setState({
      searchEngine
    });
    return searchEngine;
    
  }

  /**
   * Called on page load. Inits search engine and plugs in params to search.
   */
  async fetchData() {
    const { pageSize, facets } = this.state;
    const searchEngine = await this.initSearch();

    const params = new URLSearchParams(window.location.search);
    let term = "";
		let page = 1;
    let sort = "alpha";
    let selectedFacets = [];

    for(let pair of params.entries()) {
      let param = pair[0];
      let value = pair[1];
      if (param === 'q') {
        term = value;
      }
      else if (param === 'page') {
        page = parseInt(value);
      }
      else if (param === 'sort') {
        sort = value;
      }
      else {
        if (Object.keys(facets).includes(param)) {
          selectedFacets.push([param,value]);
        }
      }
    }
    // TODO: get sort from params.
    const r = await searchEngine.query(term, selectedFacets, pageSize, page, sort);
    const results = r.results;
    const facetsResults = r.facetsResults;
    const total = r.total;
    const items = await this.normalize(results);
    this.setState({
      term,
      items,
      sort,
      total,
      page,
      selectedFacets,
      facetsResults,
      show: false
    });
  }

  /**
   * Maps search results to something like a familiar schema.
   */
  async normalize(items) {
    return items.map(x => {
      let item = {
          identifier: x.identifier,
          modified: x.modified,
          description: x.description,
          theme: x.theme,
          format: x.distribution,
          title: x.title,
          ref: `/dataset/${x.identifier}`,
        };
        if (x.hasOwnProperty('publisher') && x.publisher.hasOwnProperty('name')) {
          item.publisher = x.publisher.data.name;
        }
        else {
          item.publisher = ' ';
        }
      return item;
    });
  }

  async facetToggleShow(facet) {
    let updatedFacet = facet;
    updatedFacet.showAll = !updatedFacet.showAll;

    this.setState({
      facet: {
        ...this.state.access,
        updatedFacet
      }
    });
  }

  async facetChange(e) {
    const { selectedFacets, searchEngine, page, pageSize, term, sort } = this.state;
    const facetType = e.target.name;
    const facetValue = e.target.value;
    const active = e.target.checked;
    let updatedFacets = selectedFacets.slice();
    if (active === true) {
      updatedFacets.push([facetType, facetValue]);
    }
    else {
      updatedFacets = selectedFacets.filter(facet => facet[1] !== facetValue);
    }
    const r = await searchEngine.query(term, updatedFacets, pageSize, page, sort);
    const total = r.total;
    const facetsResults = r.facetsResults
    const items = await this.normalize(r.results);
    this.setState({term, total, items, facetsResults, selectedFacets: updatedFacets});
  }

  async termChange(event) {
    const term = event.target.value;
    const { selectedFacets, searchEngine, page, pageSize, sort } = this.state;
    const r = await searchEngine.query(term, selectedFacets, pageSize, page, sort);
    const total = r.total;
    const facetsResults = r.facetsResults
    const items = await this.normalize(r.results);
    this.setState({term, total, items, facetsResults});
  }

  async sortChange(event) {
    const { term, selectedFacets, searchEngine, page, pageSize } = this.state;
    const sort = event.target.value;
    const r = await searchEngine.query(term, selectedFacets, pageSize, page, sort);
    const items = await this.normalize(r.results);
    const urlParams = {
      term,
      selectedFacets,
      page,
      sort
    }
    const url = this.composeUrlParams(urlParams);
    this.props.history.push(url);
    this.setState({items, sort});
  }

  async handlePageChange(page) {
    const { term, selectedFacets, sort, searchEngine, pageSize } = this.state;
    const r = await searchEngine.query(term, selectedFacets, pageSize, page, sort);
    const items = await this.normalize(r.results);
    const urlParams = {
      term,
      selectedFacets,
      page,
      sort
    }
    const url = this.composeUrlParams(urlParams);
    this.props.history.push(url);
    this.setState({items, page});
  }

  qOrAnd(bool) {
    if (bool) {
      return '?'
    }
    return '&'
  }

  composeUrlParams(params) {
    let url = '/search';
    let first = true;
    if (params.term) {
      url = `${url}?q=${params.term}`;
      first = false;
    }
    if (params.selectedFacets.length > 0) {
      params.selectedFacets.forEach((facet) => {
        url = `${url}${this.qOrAnd(first)}${facet[0]}=${facet[1]}`;
        first = false;
      });
    }
    if (params.page) {
      url = `${url}${this.qOrAnd(first)}page=${params.page}`;
      first = false;
    }
    if (params.sort !== 'alpha') {
      url = `${url}${this.qOrAnd(first)}sort=${params.sort}`;
    }
    return url;
  }

  async handlePageSizeChange(event) {
    const { term, selectedFacets, searchEngine, page, sort } = this.state;
    const pageSize = parseInt(event.target.value);
    const r = await searchEngine.query(term, selectedFacets, pageSize, page, sort);
    const items = await this.normalize(r.results);
    const urlParams = {
      term,
      selectedFacets,
      page,
      sort
    }
    const url = this.composeUrlParams(urlParams);
    this.props.history.push(url);
    this.setState({items, pageSize});
  }

  componentDidMount() {
    if (!this.state.searchEngine) {
      this.fetchData();
    }
    if(typeof window !== undefined) {
      this.setState({window: true})
    }
  }

  currentPageResults() {
    const { total, pageSize, page } = this.state;

    const currentLowestResult = 1 + ((pageSize * page) - pageSize);
    let currentHighestResult = (pageSize * page);
    if(currentHighestResult > total) {
      currentHighestResult = total;
    }

    return (<div className="dataset-results-count">{currentLowestResult}-{currentHighestResult} out of {total} datasets</div>)
  };

  render() {
    const { items, facets, sort, show, total, pageSize, term, selectedFacets, facetsResults, page } = this.state;
    const message = term ? `${total} datasets found for ${term}` : `${total} datasets`;
    const facetChange = this.facetChange.bind(this);
    const facetToggleShow = this.facetToggleShow.bind(this);
    const facetListProps = {
      term,
      sort,
      facets,
      facetsResults,
      selectedFacets,
      facetCallback: facetChange,
      toggleAllCallback: facetToggleShow,
      Link,
      url: "search"
    };

    return (
      <Layout path={this.props.path} title="Search">
        <Wrapper className="search-page containter-fluid m-5">
          <div className="row">
            <PageHeader title="Datasets" />
          </div>
          <div className="row">
            <div className="results-list col-md-8 col-sm-12 p-5">
              <SearchInput
                label="Dataset Search Filter"
                labelid="dataset_search_filter_label"
                labelClassName="sr-only"
                id="search"
                ariaLabel="Dataset Search Filter"
                name="dataset_search_filter"
                placeholder="Type your search term here...e.g. physician quality, medicare spending..."
                onChange={this.termChange.bind(this)}
              />
              {this.state.window &&
                <Loader hideContentOnLoad backgroundStyle={{backgroundColor: "#f9fafb"}} foregroundStyle={{backgroundColor: "#f9fafb"}} show={show} message={<LoadingSpin width={"3px"} primaryColor={"#007BBC"}/>}>
                  <SearchList items={items} message={message} />
                  <StyledPagination className="pagination-container">
                    {this.currentPageResults()}
                    <Select
                      aria-label="Results per page"
                      defaultValue={"10"}
                      size="medium"
                      name="results_per_page"
                      onChange={this.handlePageSizeChange.bind(this)}
                    >
                      {[5,10,15,20,25,30,35,40,45,50].map(el => (
                        <option key={el} value={el}>{`${el} per page`}</option>
                      ))
                      }
                    </Select>
                    <Pagination
                      hideDisabled
                      activePage={page}
                      itemsCountPerPage={pageSize}
                      totalItemsCount={total}
                      pageRangeDisplayed={5}
                      onChange={this.handlePageChange.bind(this)}
                    />
                  </StyledPagination>
                </Loader>
              }
            </div>
            <div className="search-sidebar col-md-4 col-sm-12 p-5">
              <div className="search-sidebar-options ds-u-radius">
                <FormLabel className="search-sidebar-label" for="search_sort_change">Sort by</FormLabel>
                <Select
                  aria-label="Search Sort Change"
                  defaultValue="1"
                  name="search_sort_change"
                  className="form-control input-sm"
                  onChange={this.sortChange.bind(this)}
                >
                  <option value="relevance">Relevance</option>
                  <option value="date">Date</option>
                  <option value="alpha">Alphabetical</option>
                </Select>
              </div>
              <div className="search-sidebar-options ds-u-radius">
                <FacetList {... facetListProps} />
              </div>
            </div>
          </div>
        </Wrapper>
      </Layout>
    );
  }
}

export default Search;
