/* eslint-disable */
import styled from 'styled-components';

const Wrapper = styled.li`
  background: #fff;
  border: 1px solid ${props => props.theme.borderColor};
  padding: 16px 45px 16px 48px;
  list-style: none;
  margin-bottom: 2rem;
  &:hover {
    border-left: 4px solid ${props => props.theme.primary};
    padding-left: 45px;
  }
  a {
    color: ${props => props.theme.headingColor};
    text-decoration: none;
    &:hover {
      color: ${props => props.theme.headingColor};
      text-decoration: none;
    }
  }
  h2 {
    margin: 8px 0;
  }
  .item-description {
    padding-top: 1rem;
  }
  .item-publisher {
    color: ${props => props.theme.grayMedium};
    margin: .5em 0;
    svg {
      margin-right: 1rem;
      path {
        fill: ${props => props.theme.grayMedium};
      }
    }
  }
  .item-theme {
    font-style: normal;
    letter-spacing: .25px;
    margin: .5em 0;
    padding-bottom: .75em;
    a {
      color: ${props => props.theme.grayMedium};
      display: inline-block;
      position: relative;
      padding: 0 20px 0 30px;
    }
    img, svg {
      position: absolute;
      top:0;
      left:0;
      fill: ${props => props.theme.grayMedium};
    }
  }
  .format-types {
    display: flex;
    align-items: flex-start;
    align-content: stretch;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;
    margin-top: 0.9em;
  }
  .label {
    border-radius: 3px;
    color: white;
    font-size: 1.4rem;
    line-height: 1.6rem;
    white-space: nowrap;
    display: inline-block;
    padding: 5px 8px;
    margin: .75em 16px .75em 0;
    &:first-of-type {
      margin-left: 0;
    }
  }
  .label[data-format="csv"]     { background: ${props => props.theme.csvIcon}; }
  .label[data-format="json"]    { background: ${props => props.theme.jsonIcon}; }
  .label[data-format="pdf"]     { background: ${props => props.theme.pdfIcon}; }
  .label[data-format="rdf"],     
  .label[data-format="rdf+xml"] { background: ${props => props.theme.rdfIcon}; }
  .label[data-format="xml"]     { background: ${props => props.theme.xmlIcon}; }
  .label[data-format="zip"]     { background: ${props => props.theme.zipIcon}; }
  .label[data-format="data"]    { background: ${props => props.theme.dataIcon}; }
`;

export default Wrapper;
