import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-content: stretch;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 16px;
  font-size: 1.4rem;
  .page-size-options {

    label.ds-c-label {
      display: inline-block;
      margin: 0 5px 0 0;
      font-size: 1.4rem;
    }
    select.ds-c-field {
      display: inline-block;
      max-width: 80px;
      width: 80px;
    }
  }
  .density-buttons {
    display: inline-block;
    button[type="button"] {
      padding: 6px;
      margin: 2px;
      border: 1px solid ${props => props.theme.grayLight};
      background: white;
      &:first-of-type {
        margin-left: 8px;
      }
    }
  }

  .data-table-results {
    min-width: 170px;
    p {
      margin-bottom: 0;
    }
  }

  .data-table-adv-options {
    position: relative;
    display: inline-block;
    background: none;
    border-radius: 25px;
    border: 1px solid ${props => props.theme.grayLight};
    padding: 8px 16px;
  }

  .table-header-rows-per-page {
    span {
      font-weight: 400;
    }
  }
  .table-header-select select {
    border: 1px solid ${props => props.theme.grayLight};
  }
  .table-controls {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    width: 85%;
  }
  .fullscreen-button {
    border: none;
    background-color: transparent;
    height: 40px;
    vertical-align: middle;
  }
`;

export default Wrapper;
