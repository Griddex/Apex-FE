import React from "react";
import { SelectCellFormatter, SelectColumn } from "react-data-griddex";
import { Column } from "react-data-griddex";
import { IApexCheckbox } from "./ApexCheckboxTypes";
import { useDispatch } from "react-redux";

const apexCheckbox = ({
  shouldExecute,
  shouldDispatch,
  apexCheckboxAction,
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
            if (shouldExecute) {
              if (shouldDispatch) dispatch(apexCheckboxAction());
              else apexCheckboxAction(props.row);
            }
          }}
          onChange={props.onRowSelectionChange}
        />
      );
    },
  };
};

export default apexCheckbox;
