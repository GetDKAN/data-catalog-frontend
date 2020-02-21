import React from 'react';
import Layout from '../../components/Layout';
import { defaultFacets, normalizeItems, sortOptions } from '../../config/search';
import { Search, PageHeader, SearchSidebar, SearchContent } from "@civicactions/data-catalog-components";
import './search.scss';

const SearchTemplate = ({path, location}) => {
  return (
    <Layout path={path} title="Search">
      <div className="dc-search-page containter-fluid m-5">
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
      </div>
    </Layout>
  );
}

export default SearchTemplate;
