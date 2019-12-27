import styled from "styled-components";

const Wrapper = styled.div`
  padding-top: 80px;
  padding-bottom: 60px;
  ul {
    display: flex;
    align-items: flex-start;
    align-content: stretch;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
  li {
    width: 30%;
  }
  h2.section-title {
    text-align: center;
  }
  // Override default styles.
  .search-list-item {
    background: none;
    border: none;
    border-radius: none;
    padding: 0;
    h2 {
      font-size: 2rem;
    }
  }
  @media screen and (max-width: 768px) {
    li {
      width: 100%;
    }
  }
`;

export default Wrapper;
