import React from "react";
import { SelectCellFormatter } from "react-data-griddex";
import { Column } from "react-data-griddex";

export const SELECT_COLUMN_KEY = "select-row";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ApexCheckbox: Column<any, any> = {
  key: SELECT_COLUMN_KEY,
  name: "",
  width: 35,
  maxWidth: 35,
  resizable: false,
  sortable: false,
  frozen: true,
  headerRenderer(props) {
    return (
      <SelectCellFormatter
        aria-label="Select All"
        value={props.allRowsSelected}
        onChange={props.onAllRowsSelectionChange}
      />
    );
  },
  formatter(props) {
    return (
      <SelectCellFormatter
        aria-label="Select"
        tabIndex={-1}
        isCellSelected={props.isCellSelected}
        value={props.isRowSelected}
        onClick={(event: React.ChangeEvent<any>) =>
          event.nativeEvent.stopPropagation()
        }
        onChange={props.onRowSelectionChange}
      />
    );
  },
  groupFormatter(props) {
    return (
      <SelectCellFormatter
        aria-label="Select Group"
        tabIndex={-1}
        isCellSelected={props.isCellSelected}
        value={props.isRowSelected}
        onChange={props.onRowSelectionChange}
        // Stop propagation to prevent row selection
        onClick={(event: React.ChangeEvent<any>) =>
          event.nativeEvent.stopPropagation()
        }
      />
    );
  },
};
