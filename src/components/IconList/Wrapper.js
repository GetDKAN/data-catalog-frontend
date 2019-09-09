import styled from "styled-components";

const Wrapper = styled.div`
  padding-top: 24px;
  padding-bottom: 24px;
  h2 {
    display: block;
    margin-bottom: 24px;
    text-align: center;
  }
  ul {
    list-style:none;
    display: flex;
    align-items: stretch;
    align-content: flex-start;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
  }
  li {
    text-align: center;
    padding-left: 15px;
    padding-right: 15px;
  }

  @media screen and (min-width: 1200px) {
    li {
      max-width: 25%;
    }
  }
`;

export default Wrapper;
