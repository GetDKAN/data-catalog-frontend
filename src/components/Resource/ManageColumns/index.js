import React, { useState, useContext } from "react";
import StyledDialog from "./StyledDialog";
import AdvancedOptionsFormWrapper from "./AdvancedOptionsFormWrapper";
import {
  ResourceDispatch,
  AdvancedOptionsForm
} from "@civicactions/data-catalog-components";

const ManageColumns = () => {
  const { resourceState, dispatch } = useContext(ResourceDispatch);
  const { columns, excludedColumns, columnOrder } = resourceState;
  const [modalOpen, toggleModal] = useState(false);
  return (
    <div>
      <button
        id="advanced_table_settings"
        className="dataset-button data-table-adv-options"
        onClick={true ? () => toggleModal(!modalOpen) : null}
      >
        <span>Manage columns</span>
      </button>
      {modalOpen && (
        <StyledDialog
          title="Manage Columns"
          onExit={() => toggleModal(!modalOpen)}
          closeText={""}
          actions={[
            <button
              className="ds-c-button ds-c-button--primary"
              key="primary"
              onClick={() => toggleModal(!modalOpen)}
            >
              Update Columns
            </button>
          ]}
        >
          <div className="column-labels">
            <span>Display column</span>
            <span>Reorder</span>
          </div>
          <AdvancedOptionsFormWrapper>
            <AdvancedOptionsForm
              columnOrder={columnOrder}
              excludedColumns={excludedColumns}
              columns={columns}
              toggleColumns={columnsData =>
                dispatch({
                  type: "TOGGLE_COLUMNS",
                  data: { excludedColumns: columnsData }
                })
              }
              reorderColumns={columns =>
                dispatch({
                  type: "REORDER_COLUMNS",
                  data: { columnOrder: columns }
                })
              }
              itemClasses={{
                input: "ds-c-choice",
                label: "ds-c-label"
              }}
            />
          </AdvancedOptionsFormWrapper>
        </StyledDialog>
      )}
    </div>
  );
};

export default ManageColumns;
