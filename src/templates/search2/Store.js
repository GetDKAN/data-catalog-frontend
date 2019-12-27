import React, { useState } from "react";
import SearchContext from "./Context";

export const Initializer = () => {
  const [items, setItems] = useState([]);
  const [sortOrderDescending, setSortOrderDescending] = useState(true);
  return { items, setItems, sortOrderDescending, setSortOrderDescending };
};

function work(items, setItems, sortOrderDescending) {
  if (items.length === 0) {
    setItems(["algorithm", "beta", "car"]);
    work.descending = true;
  } else if (sortOrderDescending === true && work.descending === false) {
    items.sort();
    setItems(items);
    work.descending = true;
  } else if (sortOrderDescending === false && work.descending === true) {
    items.sort();
    items.reverse();
    setItems(items);
    work.descending = false;
  }
}

const Store = () => {
  return (
    <SearchContext.Consumer>
      {({ items, setItems, sortOrderDescending }) => {
        work(items, setItems, sortOrderDescending);
      }}
    </SearchContext.Consumer>
  );
};

export default Store;
