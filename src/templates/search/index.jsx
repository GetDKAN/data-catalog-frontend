import React from 'react';
import Layout from '../../components/Layout';
import { defaultFacets, normalizeItems, sortOptions } from '../../config/search';
import { Search, SearchSidebar, SearchContent } from "@civicactions/data-catalog-components";
import config from "../../assets/config";

const SearchTemplate = ({path, location}) => {
  return (
    <Layout path={path} title="Search">
      <div className={`dc-page ${config.container}`}>
        <h1>Datasets</h1>
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
