import styled from "styled-components";
import { SearchList } from "@civicactions/data-catalog-components";

const StyledSearchList = styled(SearchList)`
  .results-message {
    padding: 15px 0;
    border-bottom: 1px solid ${props => props.theme.grayLight};
  }

  ol {
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
  }
`;

export default StyledSearchList;
