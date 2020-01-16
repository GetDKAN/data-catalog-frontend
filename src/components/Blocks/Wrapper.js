/* eslint-disable */

import styled from "styled-components";

const Wrapper = styled.div`
  .pane-content {
    display: flex;
    align-items: stretch;
    align-content: stretch;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    h2,
    h3 {
      margin-top: 0;
    }
  }

  &.BasicBlock {
    &.2-col {
      min-width: 50%;
    }
    &.3-col {
      min-width: 33%;
    }
    &.4-col {
      min-width: 25%;
    }
  }

  @media screen and (max-width: 768px) {
    .pane-content {
      flex-wrap: wrap;
      .steps-block {
        max-width: 100%;
      }
    }
  }
`;

export default Wrapper;
