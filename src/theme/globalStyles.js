import { createGlobalStyle } from "styled-components";
import { css } from "bootstrap/dist/css/bootstrap.min.css"; // eslint-disable-line no-unused-vars
//import { cms_css } from '@cmsgov/design-system-core/dist/index.css';
import "./fonts/Geometria/demo.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import defaultTheme from "./default";

library.add(fab, fas);

const GlobalStyles = createGlobalStyle`
  @import url('https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
  @import url('https://fonts.googleapis.com/css?family=Muli:200,300,400,900');

  html {
    /*Convert font size to base 10 for easier calculations (1rem = 10px)*/
    font-size: 62.5%;
  }
  .App {
    font-family: Muli, "Helvetica Neue", Arial, sans-serif;
    font-size: 1.6rem;

    background-color: ${defaultTheme.backgroundColor};
    color: ${defaultTheme.textColor};

    a {
      color: ${defaultTheme.linkColor};
      &:hover,
      &:focus {
        color: ${defaultTheme.linkHoverColor};
      }
    }
    h1,h2,h3,h4,h5 {
      color: ${defaultTheme.headingColor};
      font-family: 'Geometria W01 ExtraBold','WorkSansBold', Arial, sans-serif;
    }
    h1 { font-size: 3.2rem; }
    h2 { font-size: 2.8rem; } //28px
    h3 { font-size: 2.0rem; } // 20px

    .block-wrapper {
      padding: 1em;
      text-align: center;
      border: 1px solid ${defaultTheme.borderColor};
      margin-bottom: 32px;
      background: #fff;
    }
    .item-theme {
      margin-bottom: 10px;
      display: block;
      position: relative;
      a {
        color: ${defaultTheme.grayMedium};
        padding: 0 20px 0 30px;
        display: inline;
      }
      svg {
        position: absolute;
        top: 0;
        left: 0;
        path {
          fill: ${defaultTheme.grayMedium};
        }
      }
    }
    
    .search-page .form-control {
      font-size: 1.6rem;
      margin-bottom: 10px;
    }
    .container-front {
      background-color: #ffffff;
      border-top: 4px solid #42E288;
      box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.15);
      max-width: 1040px;
      margin-bottom: 40px;
    }
    .icon-list-container {
      padding-top: 40px;
      padding-bottom: 40px;
      h2 {
        font-size: 2.8rem !important;
        letter-spacing: 0;
        text-transform: none;
      }
      .opendata-icon-list {
        padding: 0;
      }
      li {
        display: flex;
        text-align: center;
        padding-left: 15px;
        padding-right: 15px;
        width: 100%;
        a {
          width: 100%;
          flex: 1 0 auto;
        }
      }
    }
    .label[data-format="csv"]     { background: ${defaultTheme.csvIcon}; }
    .label[data-format="json"]    { background: ${defaultTheme.jsonIcon}; }
    .label[data-format="pdf"]     { background: ${defaultTheme.pdfIcon}; }
    .label[data-format="rdf"],     
    .label[data-format="rdf+xml"] { background: ${defaultTheme.rdfIcon}; }
    .label[data-format="xml"]     { background: ${defaultTheme.xmlIcon}; }
    .label[data-format="zip"]     { background: ${defaultTheme.zipIcon}; }
    .label[data-format="data"]    { background: ${defaultTheme.dataIcon}; }
  

    .resource-table-header {
      position: relative;
      display: flex;
      align-items: flex-start;
      align-content: stretch;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: space-between;

      .preview-rows {
        margin-top: 13px;
      }

      .page-size-options {
        label.ds-c-label {
          display: inline-block;
          margin: 0 5px 0 0;
        }
        select.ds-c-field {
          display: inline-block;
          width: 150px;
        }
      }
      .density-buttons {
        margin-top: 6px;
        button {
          margin 4px;
        }
      }
    }
    .ReactTable .rt-thead .rt-th.-sort-asc,
    .ReactTable .rt-thead .rt-th.-sort-desc {
      position: relative;
      padding-right: 20px;
      box-shadow: none;
    }
    .ReactTable .rt-thead .rt-th.-sort-asc:before,
    .ReactTable .rt-thead .rt-th.-sort-desc:before {
      font-family: FontAwesome;
      position: absolute;
      top: 7px;
      right: 5px;
    }
    .ReactTable .rt-thead .rt-th.-sort-asc:before {
      content: '\\f062';
    }
    .ReactTable .rt-thead .rt-th.-sort-desc:before {
      content: '\\f063';
    }

    .search-facet-blocks {
      button {
        width: 100%;
      }
    }
  
    @media screen and (max-width: 768px) {
      .hero .block {
        max-width: 100%;
      }
    }
    @media all and (min-width: 1200px) {
      .opendata-icon-list li {
        width: 33.33%;
        max-width: 33.33%;
      }
    }
    @media all and (min-width: 769px) and (max-width : 1199px) {
      .opendata-icon-list li {
        width: 50%;
      }
    }
  }
`;
export default GlobalStyles;
