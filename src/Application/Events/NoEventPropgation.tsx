import React from "react";

const noEventPropgation = (action?: () => void) => {
  return {
    onClick: (event: React.ChangeEvent<any>) => {
      event.persist();
      event.stopPropagation();
      action && action();
    },
    onDoubleClick: (event: React.ChangeEvent<any>) => {
      event.persist();
      event.stopPropagation();
    },
  };
};

export default noEventPropgation;
