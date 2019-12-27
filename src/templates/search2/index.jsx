import React from "react";
import SearchContext from "./Context";
import Store, { Initializer } from "./Store";
import List from "./List";
import SortToggle from "./SortToggle";

const Search = () => {
  return (
    <SearchContext.Provider value={Initializer()}>
      <Store />
      <List />
      <SortToggle />
    </SearchContext.Provider>
  );
};

export default Search;
