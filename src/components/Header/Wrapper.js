import styled from "styled-components";

const Wrapper = styled.div`
  svg {
    margin: -2px 20px 0 0;
    display: inline-block;
  }
  .dkan-link-container {
    display: inline-block;
    height: 80px;
    a {
      display: block;
      margin: 20px 20px 0 0;
      padding-bottom: 4px;
      &:focus,
      &:hover {
        border-bottom: 1px dotted #323a45;
      }
    }
  }
  .logo {
    display: inline-block;
    padding: 10px 0;
  }
  .row {
    display: flex;
    min-height: 80px;
    margin: 0;
    align-items: flex-start;
    align-content: center;
    flex-direction: row;
    flex-wrap: nowrap;
  }
  .dkan-text-container {
    display: inline-block;
    font-size: 18px;
    font-family: "Muli", Arial, sans-serif;
    padding: 28px 0 0 20px;
    color: #6f757c;
  }
  .header-menu {
    text-align: right;
    margin-top: 30px;
    li {
      display: inline;
      a {
        margin: 3px 7px;
        font-size: 1.5rem;
        color: ${props => props.theme.linkColor};
        &:hover,
        &:focus,
        .active {
          color: ${props => props.theme.linkHoverColor};
          text-decoration: underline;
        }
      }
    }
  }

  @media screen and (max-width: 1199px) {
    .row {
      flex-wrap: wrap;
    }
    .dkan-text-container,
    .dkan-link-container {
      display: block;
      text-align: center;
      border: none;
      height: auto;
      padding: 0;
    }
    .dkan-link-container a {
      display: inline-block;
      margin: 20px 0 0 0;
      border-bottom: 1px solid white;
    }
    ul.header-menu {
      display: block;
      float: none;
      margin: 10px auto;
      padding: 0;
      text-align: center;
    }
    a,
    img {
      max-width: 100%;
    }
  }
`;

export default Wrapper;
