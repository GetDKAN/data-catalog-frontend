import styled from "styled-components";

const AdvancedOptionsFormWrapper = styled.div`
  max-height: 50vh;
  overflow: scroll;
  box-shadow: inset 0px 0px 2px 0px rgba(0, 0, 0, 0.5);
  fieldset {
    margin-top: 0;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li {
    width: 100%;
  }
  fieldset.target {
    .ds-c-choice:checked + label::before {
      background-color: ${props => props.theme.highlight};
      border-color: ${props => props.theme.highlight};
    }
  }
`;

export default AdvancedOptionsFormWrapper;
