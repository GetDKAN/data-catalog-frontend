import React, { useState, useContext } from "react";
import StyledDialog from "../ManageColumns/StyledDialog";
import {
  ResourceDispatch,
  advancedColumns,
  DataTable
} from "@civicactions/data-catalog-components";
import DatatableHeader from "../DatatableHeader";
import StyledFullScreenContent from "./StyledFullScreenContent";

const FullScreenResource = () => {
  const [modalOpen, toggleModal] = useState(false);
  const { resourceState, dispatch } = useContext(ResourceDispatch);
  const advTableColumns = advancedColumns(
    resourceState.columns,
    resourceState.columnOrder,
    resourceState.excludedColumns
  );
  const pages = Math.ceil(
    parseInt(resourceState.rowsTotal, 10) / resourceState.pageSize
  );
  return (
    <div>
      <button
        id={`${resourceState.identifier}-fullscreen-button`}
        className="fullscreen-button"
        onClick={true ? () => toggleModal(!modalOpen) : null}
      >
        <i className="fa fa-2x fa-expand" aria-hidden="true" title="Full Screen" />
      </button>
      {modalOpen && (
        <StyledDialog
          title="Dataset explorer"
          onExit={() => toggleModal(!modalOpen)}
          closeText={""}
          size="full"
          className="fullscreen-resource"
          includeDefaultStyles={false}
        >
          <StyledFullScreenContent>
            <DatatableHeader fullscreen />
            <DataTable
              index={1}
              key={resourceState.identifier}
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
                dispatch({
                  type: "UPDATE_FILTERS",
                  data: { filters: filtered }
                })
              } // => {setFilters(filtered, column); setCurrentPage(0);}
              pageChange={pageIndex =>
                dispatch({ type: "UPDATE_PAGE", data: { page: pageIndex } })
              }
            />
          </StyledFullScreenContent>
        </StyledDialog>
      )}
    </div>
  );
};

export default FullScreenResource;
