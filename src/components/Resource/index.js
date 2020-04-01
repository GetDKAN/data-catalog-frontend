import React, { useEffect } from "react";
import DatatableHeader from "./DatatableHeader";
import {
  Resource,
  DataTable,
  FileDownload
} from "@civicactions/data-catalog-components";

const ResourceTemplate = ({ resource, identifier }) => {
  const format = resource.hasOwnProperty('data') && resource.data.hasOwnProperty('format') ? resource.data.format : 'unknown';
  const rootURL = `${process.env.DYNAMIC_API_URL}/`;
  return (
    <Resource
      apiURL={rootURL}
      identifier={identifier}
      resource={resource}
    >
      <FileDownload label={resource.data.downloadURL} format={format} downloadURL={resource.data.downloadURL} />
      <DatatableHeader />
      <DataTable />
    </Resource>
  );
};

export default ResourceTemplate;
