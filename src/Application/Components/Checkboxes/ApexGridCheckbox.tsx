import React from "react";
import { SelectCellFormatter, SelectColumn } from "react-data-griddex";
import { Column } from "react-data-griddex";
import { IApexGridCheckbox } from "./ApexGridCheckboxTypes";
import { useDispatch } from "react-redux";

const apexGridCheckbox = ({
  shouldExecute,
  shouldDispatch,
  apexGridCheckboxFxn,
}: IApexGridCheckbox): Column<any, any> => {
  const dispatch = useDispatch();

  return {
    ...SelectColumn,
    frozen: false,
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
            if (shouldExecute) {
              if (shouldDispatch) dispatch(apexGridCheckboxFxn());
              else apexGridCheckboxFxn(props.row);
            }
          }}
          onChange={props.onRowSelectionChange}
        />
      );
    },
  };
};

export default apexGridCheckbox;
