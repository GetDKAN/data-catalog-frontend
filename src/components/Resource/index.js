import React, { useEffect } from "react";
import DatatableHeader from "./DatatableHeader";
import {
  DataTable,
  defaultResourceState,
  ResourceDispatch,
  resourceReducer,
  queryResourceData,
  queryAllResourceData,
  getDKANDatastore,
  advancedColumns,
  getFileDatastore
} from "@civicactions/data-catalog-components";

const Resource = ({ resource, identifier }) => {
    // File Format.
    const type = resource.hasOwnProperty('mediaType') ? resource.mediaType.split('/') : '';
    const backup = type ? type[1] : 'unknown';
    const format = resource.hasOwnProperty('format') ? resource.format : backup;
    // File Url.
    const accessURL = resource.hasOwnProperty('accessURL') ? resource.accessURL : '';
    const fileURL = resource.hasOwnProperty('downloadURL') ? resource.downloadURL : accessURL;
    const title = resource.hasOwnProperty('title') ? resource.title : format;
  const rootURL = `${process.env.DYNAMIC_API_URL}/`;
  const [resourceState, dispatch] = React.useReducer(
    resourceReducer,
    defaultResourceState
  );

  useEffect(() => {
    async function getStore() {
      if (resourceState.storeType === null) {
        dispatch(await getFileDatastore(fileURL));
      } else {
        dispatch(await getDKANDatastore(rootURL, resource));
      }
    }
    async function queryStore() {
      if (resourceState.queryAll) {
        dispatch(await queryAllResourceData(resourceState.store));
      } else {
        dispatch(await queryResourceData(resourceState));
      }
    }
    dispatch({ type: "GET_STORE" });
    if (resourceState.store !== null) {
      queryStore();
    } else {
      getStore();
    }
  }, [
    resourceState.store,
    resourceState.storeType,
    resourceState.currentPage,
    resourceState.filters,
    resourceState.pageSize,
    resourceState.sort
  ]);
  const dataKey = identifier;
  const advTableColumns = advancedColumns(
    resourceState.columns,
    resourceState.columnOrder,
    resourceState.excludedColumns
  );
  const pages = Math.ceil(
    parseInt(resourceState.rowsTotal, 10) / resourceState.pageSize
  );
  const preview = ["csv", "CSV", "text/csv"];

  return (
    <ResourceDispatch.Provider value={{ resourceState, dispatch }}>

      <FileDownload label={title} format={format} downloadURL={fileURL} />

      {resourceState.values && preview.includes(format) && (
        <div>
          <DatatableHeader />
          <DataTable
            index={1}
            key={dataKey}
            loading={resourceState.loading}
            pageSize={resourceState.pageSize}
            pages={pages}
            currentPage={resourceState.currentPage}
            data={resourceState.values}
            filtered={resourceState.filters}
            columns={advTableColumns}
            density={resourceState.density}
            sortedChange={(newSorted, column, shiftKey) =>
              dispatch({
                type: "UPDATE_COLUMN_SORT",
                data: { sort: newSorted }
              })
            }
            filterChange={(filtered, column) =>
              dispatch({ type: "UPDATE_FILTERS", data: { filters: filtered } })
            } // => {setFilters(filtered, column); setCurrentPage(0);}
            pageChange={pageIndex =>
              dispatch({ type: "UPDATE_PAGE", data: { page: pageIndex } })
            }
          />
        </div>
      )}
    </ResourceDispatch.Provider>
  );
};

export default Resource;
