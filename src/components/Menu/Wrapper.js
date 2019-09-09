import styled from "styled-components";

const Wrapper = styled.nav`
  ul {
    list-style-type: none;
    padding: 0;
    li {
      list-style-type: none;
    }
  }
  &.nav-horizontal {
    li {
      display: inline-block;
      margin: 0 15px;
    }
  }
`;

export default Wrapper;
