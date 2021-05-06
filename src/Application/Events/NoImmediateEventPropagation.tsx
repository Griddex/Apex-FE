import React from "react";

const NoImmediateEventPropgation = {
  onClick: (event: React.ChangeEvent<any>) => {
    event.persist();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  },
  onDoubleClick: (event: React.ChangeEvent<any>) => {
    event.persist();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  },
};

export default NoImmediateEventPropgation;
