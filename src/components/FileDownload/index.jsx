/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';
import FormatIcon from '../FormatIcon';
//import { FormatIcon } from "@civicactions/data-catalog-components";

function FileDownload(props) {

  const { format, downloadURL, label } = props;
  const title = label ? label : format;
  const item =
    <div className="resource">
      <FormatIcon format={format} />
      <a href={downloadURL} title={format}>
          {label}
      </a>
    </div>
    
  return (
    <Wrapper className="file-download">
      {item}
    </Wrapper>
  );
}

FileDownload.propTypes = {
  title: PropTypes.string,
  format: PropTypes.string,
  downloadURL: PropTypes.string
};

export default FileDownload;