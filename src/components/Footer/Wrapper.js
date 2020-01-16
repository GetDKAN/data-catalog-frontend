/* eslint-disable */

import styled from "styled-components";

const Wrapper = styled.div`
  border-top: 1px solid ${props => props.theme.borderColor};
  background-color: ${props => props.theme.footerBackgroundColor};
  color: ${props => props.theme.footerText};
  padding: 40px 0;

  .page-footer {
    display: flex;
    align-items: flex-start;
    align-content: flex-start;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;

    h2,h3,h4 {
      color: ${props => props.theme.footerText};
    }
    a {
      color: ${props => props.theme.footerLink};
      text-decoration: none;
      &:hover,
      &:focus {
        color: ${props => props.theme.footerLinkHover};
        text-decoration: underline;
      }
    }
  }
  ul {
    list-style-type: none;
    list-style: none;
    margin: 10px 40px 0 0;
    padding: 0;
    li:first-of-type {
      font-weight: 700;
    }
    a {
      display: block;
      font-size: 1.92rem;
      padding: 4px 4px 4px 0;
      text-decoration: none;
      &:hover,
      &:focus {
        text-decoration: underline;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .page-footer {
      flex-wrap: wrap;
      nav {
        display: block;
        width: 100%;
        ul {
          margin-right: 0;
        }
      }
    }
    .copyright {
      margin-top: 30px;
    }
  }
`;

export default Wrapper;
