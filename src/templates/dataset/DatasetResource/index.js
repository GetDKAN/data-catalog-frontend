import React from 'react';
import Resource from '../../../components/ca_resource/Resource';
import withResource from '../../../components/ca_resource/Resource/withResource';

const DatasetResource = ({
  identifier,
  resource,
  data
}) => {
  return(
    <h1>blah</h1>
    // <Resource
    //   dataPreview,
    //   dataInfo,
    //   dataFunctions,
    //   infoTableOptions,
    //   headerOptions,
    //   datasetId,
    // />
  );
}

export default withResource(DatasetResource, process.env.DYNAMIC_API_URL);
