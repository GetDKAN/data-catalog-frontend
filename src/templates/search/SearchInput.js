import styled from "styled-components";
import { TextField } from "@cmsgov/design-system-core";

const StyledSearchInput = styled(TextField)`
  width: 100%;
  input {
    border: 1px solid ${props => props.theme.grayLight};
    max-width: 100%;
  }
`;

export default StyledSearchInput;
