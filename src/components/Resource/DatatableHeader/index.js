import React, { useContext } from "react";
import Wrapper from "./Wrapper";
import { ChoiceList } from "@cmsgov/design-system-core";
import {
  DataTableDensity,
  DataTablePageResults,
  ResourceDispatch
} from "@civicactions/data-catalog-components";
import FAPIcon from "../../FontAwesomePro";
import FullScreenResource from "../FullScreenResource";
import ManageColumns from "../ManageColumns";

const DatatableHeader = ({ fullscreen }) => {
  const { resourceState, dispatch } = useContext(ResourceDispatch);
  const { pageSize, count, currentPage } = resourceState;
  const pageSizeOptions = [
    { defaultChecked: true, label: "20", value: "20" },
    { label: "50", value: "50" },
    { label: "100", value: "100" }
  ];
  return (
    <Wrapper className="resource-table-header">
      <DataTablePageResults
        total={count}
        pageSize={pageSize}
        currentPage={currentPage}
      />
      <div className="table-controls">
        <div className="page-size-options">
          <ChoiceList
            type="select"
            name="page-size-select"
            label="Rows per page:"
            ariaLabel="Rows per page:"
            labelClassName="table-header-rows-per-page"
            className="table-header-select"
            choices={pageSizeOptions}
            value={pageSize}
            onChange={event =>
              dispatch({
                type: "UPDATE_PAGE_SIZE",
                data: { pageSize: event.target.value }
              })
            }
          />
        </div>
        <div className="density-buttons">
          <DataTableDensity
            densityChange={density =>
              dispatch({ type: "UPDATE_DENSITY", data: { density: density } })
            }
            items={[
              {
                icon: (
                  <FAPIcon
                    icon="density-1"
                    name="density-1"
                    fill="#666666"
                    height="20"
                    width="20"
                  />
                ),
                text: "expanded",
                value: "density-1"
              },
              {
                icon: (
                  <FAPIcon
                    icon="density-2"
                    name="density-2"
                    fill="#666666"
                    height="20"
                    width="20"
                  />
                ),
                text: "normal",
                value: "density-2"
              },
              {
                icon: (
                  <FAPIcon
                    icon="density-3"
                    name="density-3"
                    fill="#666666"
                    height="20"
                    width="20"
                  />
                ),
                text: "tight",
                value: "density-3"
              }
            ]}
          />
        </div>
        <ManageColumns />
        {!fullscreen && <FullScreenResource />}
      </div>
    </Wrapper>
  );
};

export default DatatableHeader;
