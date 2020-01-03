import styled from "styled-components";

const Wrapper = styled.div`
  clear: both;
  margin: 15px 0;
  .resource {
    position: relative;
  }
  a {
    line-height: 50px;
    padding-left: 5px;
  }
  .format-label {
    color: transparent;
    font-weight: normal;
    height: 50px;
    left: 0;
    position: absolute;
    text-decoration: none;
    top: 0;
    width: 35px;
    z-index: 0;
  }
`;

export default Wrapper;
