import React from "react";

const TableRowContextMenu = () => {
  const contextMenuData = [{ icon: "", title: "", extra: "" }];

  return <div>{contextMenuData.map((menuItem) => menuItem)}</div>;
};

export default TableRowContextMenu;
