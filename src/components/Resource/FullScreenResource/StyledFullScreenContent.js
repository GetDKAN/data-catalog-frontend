import styled from "styled-components";

const StyledFullScreenContent = styled.div`
  background: ${props => props.theme.backgroundColor};
  height: 75vh;
  overflow: scroll;
  padding: 18px;
`;

export default StyledFullScreenContent;
