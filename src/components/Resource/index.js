import React, { useEffect } from "react";
import {
  Resource,
  DataTable,
  FileDownload,
  DataTableHeader
} from "@civicactions/data-catalog-components";

const ResourceTemplate = ({ resource }) => {
  const format = resource.hasOwnProperty('data') && resource.data.hasOwnProperty('format') ? resource.data.format : 'unknown';
  const rootURL = `${process.env.DYNAMIC_API_URL}/`;
  return (
    <Resource
      apiURL={rootURL}
      identifier={resource.identifier}
      resource={resource}
    >
      <FileDownload
        title={resource.data.title}
        label={resource.data.downloadURL}
        format={format}
        downloadURL={resource.data.downloadURL}
      />
      <DataTableHeader />
      <DataTable />
    </Resource>
  );
};

export default ResourceTemplate;
