import styled from "styled-components";

const StyledPagination = styled.div`
  text-align: center;
  display: flex;
  align-content: center;
  align-items: center;
  select[id^="select_results_per_page"] {
    border: 1px solid ${props => props.theme.grayLight};
  }
  .pagination {
    display: inline-block;
    padding-left: 0;
    margin: 20px 0 20px 20px;
    border-radius: 4px;
    li {
      display: inline;
      a,
      span {
        position: relative;
        float: left;
        padding: 6px 12px;
        line-height: 1.42857143;
        text-decoration: none;
        color: ${props => props.theme.linkColor};
        background-color: #fff;
        border: 1px solid ${props => props.theme.borderColor};
        margin-left: -1px;
      }
    }
    li > a:focus,
    li > a:hover,
    li > span:focus,
    li > span:hover {
      z-index: 2;
      color: ${props => props.theme.primaryDark};
      background-color: #eee;
    }
    li:first-child > a,
    li:first-child > span {
      margin-left: 0;
      border-bottom-left-radius: 4px;
      border-top-left-radius: 4px;
    }
    li:last-child > a,
    li:last-child > span {
      margin-right: 0;
      border-bottom-right-radius: 4px;
      border-top-right-radius: 4px;
    }
    li.disabled > a,
    li.disabled > a:focus,
    li.disabled > a:hover,
    li.disabled > span,
    li.disabled > span:focus,
    li.disabled > span:hover {
      color: #777;
      background-color: #fff;
      border-color: ${props => props.theme.borderColor};
      cursor: not-allowed;
    }
    li.active > a,
    li.active > a:focus,
    li.active > a:hover,
    li.active > span,
    li.active > span:focus,
    li.active > span:hover {
      z-index: 3;
      color: #fff;
      background-color: ${props => props.theme.linkColor};
      border-color: ${props => props.theme.borderColor};
      cursor: default;
    }
  }
  .dataset-results-count {
    flex-grow: 2;
    text-align: left;
  }
`;

export default StyledPagination;
