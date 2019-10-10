/* eslint-disable */

import styled from "styled-components";
import { Link } from "gatsby";

const StyledLink = styled(Link)`
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 0 4px 2px #f3f3f3;
  background-color: white;
  position: relative;
  display: block;
  color: ${props => props.theme.linkColor};
  font-size: 1.15em;
  padding: 1em 2em;
  min-width: 260px;
  text-decoration: none;
  text-align: center;
  svg path {
    fill: ${props => props.theme.linkColor};
  }
  &.active,
  &:hover {
    background-color: ${props => props.theme.secondaryLight};
    text-decoration: none;
    color: ${props => props.theme.primaryDark}
    svg path {
      fill: ${props => props.theme.primaryDark}
    }
  }
  img {
    max-width: 150px;
    max-height: 100px;
    margin-bottom: 10px;
  }
  svg {
    margin: 10px;
  }
`;

export default StyledLink;