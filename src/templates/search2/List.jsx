import React, { useContext } from "react";
import SearchContext from "./Context";

const List = () => {
  const context = useContext(SearchContext);

  const items = context.items;

  return (
    <ul>
      {items.map(element => {
        return <li key={element}>{element}</li>;
      })}
    </ul>
  );
};

export default List;
