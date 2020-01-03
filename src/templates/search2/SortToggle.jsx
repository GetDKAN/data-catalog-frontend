import React from "react";
import SearchContext from "./Context";

function toggleSortOrder(sortOrderDescending, setSortOrderDescending) {
  if (sortOrderDescending) {
    setSortOrderDescending(false);
  } else {
    setSortOrderDescending(true);
  }
}

const SortToggle = () => {
  return (
    <SearchContext.Consumer>
      {({ sortOrderDescending, setSortOrderDescending }) => (
        <button
          onClick={() => {
            toggleSortOrder(sortOrderDescending, setSortOrderDescending);
          }}
        >
          Change Sort Order
        </button>
      )}
    </SearchContext.Consumer>
  );
};

export default SortToggle;
