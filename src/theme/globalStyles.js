import { createGlobalStyle } from "styled-components"
import { css } from 'bootstrap/dist/css/bootstrap.min.css'; // eslint-disable-line no-unused-vars
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import defaultTheme from './default';

library.add(fab, fas);

const GlobalStyles = createGlobalStyle`
  @import url('https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
  @import url('https://fonts.googleapis.com/css?family=IBM+Plex+Sans:400,700&display=swap');

  html {
    /*Convert font size to base 10 for easier calculations (1rem = 10px)*/
    font-size: 62.5%;
  }
  .App {
    font-family: ${defaultTheme.fontText};
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
      font-family: ${defaultTheme.fontText};
      font-weight: bold;
    }
    h1 { font-size: 3.2rem; }
    h2 { font-size: 2.4rem; } //24px
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
      a {
        color: ${defaultTheme.grayMedium};
        padding: 0 20px 0 30px;
        display: inline;
        position: relative;
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
    .search-page,
    .dataset-page {
      padding-top: 30px;
      padding-bottom: 30px;
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
        font-size: 2.4rem !important;
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
    
    .search-sidebar .ds-u-radius {
      border-radius: 0;
    }
    .search-facet-blocks {
      .toggle-block {
        border-top: 1px solid ${defaultTheme.borderColor};
        margin-top: 15px;
        h2 {
          margin: 24px 0 15px 0;
          button {
            width: 100%;
            height: 32px;
            border: none;
            background: none;
            padding: 0;
            text-align: left;
            position: relative;
            &:before {
              content: "\f078";
              font-family: "FontAwesome";
              font-size: 1.8rem;
              position: absolute;
              top: 7px;
              right: 5px;
            }
          }
        }
        &:first-of-type {
          border-top: 0;
          margin-top: 0;
          h2 {
            margin-top: 0;
          }
        }
      }
      .toggle-block.closed h2 button:before {
        content: "\f054";
      }
      li {
        margin: 8px 0;
      }
      .show-more-wrapper button {
        background-color: transparent;
        border-color: transparent;
        width: 100%;
        text-align: center;
        margin: 8px 0;
        color: ${defaultTheme.linkColor};
        &:hover {
          color: ${defaultTheme.linkHoverColor};
        }
      }
    }

    select#search-sort,
    select#search-page-sizer {
      border: 1px solid ${defaultTheme.grayLight};
      height: 3.6rem;
      background: white;
      margin-left: 4px;
    }
    .label[data-format="data"],
    .label[data-format*="geo"]    { background: ${defaultTheme.dataIcon}; }
    .label[data-format="csv"]     { background: ${defaultTheme.csvIcon}; }
    .label[data-format*="json"],
    .label[data-format="json"]    { background: ${defaultTheme.jsonIcon}; }
    .label[data-format="pdf"]     { background: ${defaultTheme.pdfIcon}; }
    .label[data-format="rdf"],    
    .label[data-format="rdf+xml"] { background: ${defaultTheme.rdfIcon}; }
    .label[data-format*="kml"],
    .label[data-format="xml"]     { background: ${defaultTheme.xmlIcon}; }
    .label[data-format="zip"]     { background: ${defaultTheme.zipIcon}; }
    .label[data-format="html"]    { background: ${defaultTheme.htmlIcon}; }
    .label[data-format="octet-stream"] { background: ${defaultTheme.octetIcon}; }
  
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

  // -------------------- Modals -------------------- //
  #react-aria-fullscreen-modal,
  .data-table-fullscreen-modal {
    width: 100%;
    padding: 10px;
    background: #FFFFFF;
  }
  .data-table-adv-actions {
    margin: 0;
    padding: 8px 24px;
    display: flex;
    justify-content: end;
    button {
      background: ${defaultTheme.primary};
      border: none;
      color: #ffffff;
      font-size: 14px;
      padding: 5px 15px;
    }
  }

  // -------------------- Advanced Options -------------------- //
  #react-aria-modal-dialog {
    background: white;
    padding: 20px;
    min-width: 50%;
    .advanced_table_setting_modal {
      overflow: scroll;
      max-height: 50vh;
      box-shadow: inset 0px 0px 2px 0px rgba(0,0,0,.5);
    }
    input.draggable-item-label {
      opacity: 0;
      position: absolute;
      &+label::before {
        content: "\f0c8";
        color: ${defaultTheme.borderColor};
        font-family: FontAwesome;
        vertical-align: middle;
        height: 32px;
        font-size: 32px;
        left: 0;
        line-height: 32px;
        position: absolute;
        text-indent: .15em;
        top: 0;
        width: 32px;
      }
      &:checked+label::before {
        content: "\f14a";
        color: ${defaultTheme.heroBackgroundColor};
        font-family: FontAwesome;
        vertical-align: middle;
        height: 32px;
        font-size: 32px;
        left: 0;
        line-height: 32px;
        position: absolute;
        text-indent: .15em;
        top: 0;
        width: 32px;
      }
    }
    label.draggable-item-input {
      margin: 0;
      position: relative;
      margin: 8px 0;
      min-height: 32px;
      padding-left: 40px;
      position: relative;
      span {
        line-height: 32px;
        font-size: 16px;
      }
    }
    .advanced-options-modal-close {
      border: none;
      font-size: 0;
    }
    .column-labels span {
      padding: 4px 10px;
    }
  }
  
  .data-table-fullscreen-modal {
    button.fullscreen-modal-close {
      border: none;
      background: none;
    }
    .data-table-fullscreen-content {
      padding-top: 10px;
    }
    .data-table-header {
      margin-top: 0;
      &:before {
        display: none;
      }
    }
  }
`;
export default GlobalStyles;
