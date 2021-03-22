import React from "react";
import { SelectCellFormatter, SelectColumn } from "react-data-griddex";
import { Column } from "react-data-griddex";
import { IApexCheckbox } from "./ApexCheckboxTypes";
import { useDispatch } from "react-redux";

export const SELECT_COLUMN_KEY = "select-row";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ApexCheckbox = ({
  shouldExecute,
  shouldDispatch,
  apexCheckboxActions,
}: IApexCheckbox): Column<any, any> => {
  const dispatch = useDispatch();

  return {
    ...SelectColumn,
    headerRenderer() {
      return <div>SELECT</div>;
    },
    formatter(props) {
      return (
        <SelectCellFormatter
          aria-label="Select"
          tabIndex={-1}
          isCellSelected={props.isCellSelected}
          value={props.isRowSelected}
          onClick={(e) => {
            e.stopPropagation();

            let i = 0;
            for (const execute of shouldExecute) {
              if (execute) {
                const action = apexCheckboxActions[i];
                if (shouldDispatch[i]) dispatch(action());
                else action();
              }
              i += 1;
            }
          }}
          onChange={props.onRowSelectionChange}
        />
      );
    },
  };
};

export default ApexCheckbox;
