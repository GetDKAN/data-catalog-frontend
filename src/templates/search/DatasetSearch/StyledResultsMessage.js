import React from "react";
import styled from "styled-components";
import { SearchResultsMessage } from "@civicactions/data-catalog-components";

const StyledResultsMessage = styled(SearchResultsMessage)`
  .search-results-facet-list {
    font-weight: 700;
  }

  .search-results-query {
    font-weight: 700;
  }

  .combined-facets {
    background: #000000;
    color: #ffffff;
    padding: 0 4px;
    border-radius: 3px;
  }
`;

export default StyledResultsMessage;
