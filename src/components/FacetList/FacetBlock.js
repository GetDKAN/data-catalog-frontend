import styled from "styled-components";

const FacetBlock = styled.div`
  padding: 20px 0;
  border-top: 1px solid ${props => props.theme.borderColor};
  &:first-of-type {
    padding: 0 0 20px 0;
    border-top: none;
  }

  &:last-of-type {
    padding-bottom: 0;
  }

  .list-group {
    .ds-c-choice + label:before {
      border-color: ${props => props.theme.borderColor};
      border-width: 1px;
    }
    .ds-c-choice:checked + label::before {
      background-color: ${props => props.theme.highlight};
      border-color: ${props => props.theme.highlight};
      border-width: 1px;
    }
    fieldset.ds-c-fieldset {
      margin: 0 !important;
      legend {
        margin-bottom: 20px;
      }
    }
  }
  button {
    margin: 1rem 0 0 0;
  }
`;

export default FacetBlock;
