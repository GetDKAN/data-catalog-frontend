import styled from "styled-components";

const Wrapper = styled.div`
  .section {
    margin: 50px 0;
    padding: 0;
    background: white;
    border: 1px solid ${props => props.theme.grayLight};
    border-radius: 20px;
  }
  .section-content {
    padding: 25px;
    display: flex;
    align-items: flex-start;
    align-content: stretch;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    .swagger-ui {
      width: 100%;
      div.info {
        margin: 0 0 10px;
      }
      .information-container,
      .block {
        padding: 0;
      }
    }
    .swagger {
      padding: 0;
    }
  }
  .block {
    position: relative;
  }
  .info {
    margin-left: 16px;
    margin-top: 0;
    background-color: ${props => props.theme.primaryDust};
    border: 1px solid #bbdcf4;
    border-left-color: ${props => props.theme.primaryLight};
    border-left-width: 4px;
    padding: 20px 24px;
  }
  h1 {
    padding: 25px;
    border-bottom: 1px solid ${props => props.theme.grayLight};
  }

  @media screen and (max-width: 768px) {
    .section-content {
      flex-wrap: wrap;
    }
    .info {
      margin: 20px 0;
    }
  }
`;

export default Wrapper;
