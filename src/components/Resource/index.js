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
  getFileDatastore,
  FileDownload
} from "@civicactions/data-catalog-components";

const Resource = ({ resource, identifier }) => {
  // Description.
  const description = resource.hasOwnProperty('description') ? resource.description : '';
  // File Format.
  const type = resource.hasOwnProperty('mediaType') ? resource.mediaType.split('/') : '';
  const backup = type ? type[1] : 'unknown';
  const format = resource.data.hasOwnProperty('format') ? resource.data.format : backup;
  // File Url.
  const accessURL = resource.data.hasOwnProperty('accessURL') ? resource.accessURL : '';
  const fileURL = resource.data.hasOwnProperty('downloadURL') ? resource.data.downloadURL : accessURL;
  const title = resource.data.hasOwnProperty('title') ? resource.data.title : format;
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
        dispatch(await queryResourceData(resourceState));
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
  const dataKey = resource.identifier ? resource.identifier : identifier;
  const advTableColumns = advancedColumns(
    resourceState.columns,
    resourceState.columnOrder,
    resourceState.excludedColumns
  );
  const totalResults = resourceState.filters.length ? resourceState.count : resourceState.rowsTotal;
  const pages = Math.ceil(parseInt(totalResults, 10) / resourceState.pageSize);
  const preview = ["csv", "CSV", "text/csv"];
  if (resourceState.values && preview.includes(format) ) {}
    return (
      <ResourceDispatch.Provider value={{ resourceState, dispatch }}>
        <FileDownload title={title} format={format} downloadURL={fileURL} description={description} />
        {resourceState.values
        && preview.includes(format)
        && (resourceState.store !== null  )
          && (
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
