import React from 'react';
import Layout from '../../components/Layout';
import Wrapper from './Wrapper';
import SearchContent from './components/SearchContent';
import SearchSidebar from './components/SearchSidebar';

import { defaultFacets, normalizeItems, sortOptions } from '../../config/search';

import { Search, PageHeader } from "@civicactions/data-catalog-components";

const SearchTemplate = ({path, location}) => {

  return (
    <Layout path={path} title="Search">
      <Wrapper className="search-page containter-fluid m-5">
        <div className="row">
          <PageHeader title="Datasets" />
        </div>
        <Search
          searchEndpoint={`${process.env.DYNAMIC_API_URL}/search`}
          defaultFacets={defaultFacets}
          sortOptions={sortOptions}
          setSearchUrl={true}
          path={path}
          location={location}
          normalize={normalizeItems}
        >
          <div className="row">
            <SearchContent />
            <SearchSidebar />
          </div>
        </Search>
      </Wrapper>
    </Layout>
  );
}

export default SearchTemplate;
