/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';
import FormatIcon from '../FormatIcon';

function FileDownload(props) {

  const { label, resource } = props;
  let format = resource.data.format ? resource.data.format.toUpperCase() : 'CSV';

  const item =
    <div className="resource">
      <FormatIcon format={format} />
      <a href={resource.data.downloadURL} title={resource.data.format}>
        <span
          data-toggle='tooltip'
          data-placement='top'
          data-original-title={resource.data.format}
          data-format={resource.data.format}
          className='format-label'
          >
            {resource.data.format}
          </span>
          {resource.data.title}
      </a>
    </div>
    
  return (
    <Wrapper className="file-download">
      {label} {item}
    </Wrapper>
  );
}

FileDownload.propTypes = {
  item: PropTypes.any,
  field: PropTypes.any,
};

export default FileDownload;
