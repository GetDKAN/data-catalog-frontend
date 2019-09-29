import React from 'react'
import styled from "styled-components";
import { Link } from "gatsby";
//const StyledLink = styled(props => <Link {...props} />)`
const StyledLink = styled(Link)`

  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 0 4px 2px #f3f3f3;
  background-color: white;
  position: relative;
  display: block;
  color: ${props => props.theme.primary};
  font-size: 1.15em;
  padding: 1em 2em;
  min-width: 260px;
  text-decoration: none;
  text-align: center;
  img {
    max-width: 150px;
    max-height: 100px;
    margin-bottom: 10px;
  }
  svg {
    margin: 10px;
    fill: ${props => props.theme.primary};
    &:focus,
    &:hover {
      fill: ${props => props.theme.primaryDark};
    }
  }  
  &:focus,
  &:hover {
    color: ${props => props.theme.primaryDark};
    background-color: ${props => props.theme.secondaryLight};
    text-decoration: none;
    svg {
      fill: ${props => props.theme.primaryDark};
    }
  }
`;

export default StyledLink;
