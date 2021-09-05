import React from "react";
import DndProvider, { DndContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

export interface IApexDnDWindow {
  children: React.ReactNode;
  targetId: string;
  window: Window;
}

const ApexDnDWindow = ({ children, targetId, window }: IApexDnDWindow) => {
  const { dragDropManager } = React.useContext(DndContext);

  React.useEffect(() => {
    //@ts-ignore
    dragDropManager?.getBackend().addEventListeners(window);
    // dragDropManager?.getBackend().connectDropTarget(targetId);
  });

  return children;
};

export default ApexDnDWindow;
