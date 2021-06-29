import React from "react";
import ArrowUpwardOutlinedIcon from "@material-ui/icons/ArrowUpwardOutlined";
import ReactExport from "react-export-excel";
import IconButtonWithTooltip from "../IconButtons/IconButtonWithTooltip";
import { ISelectOption } from "./../Selects/SelectItemsType";
import { IRawRow } from "../Table/ReactDataGrid/ApexGridTypes";

export interface IExcelSheetData {
  data: IRawRow[];
  columns: ISelectOption[];
}

export interface IExcelExportTable {
  fileName: string;
  tableData: Record<string, IExcelSheetData>;
}

const ExcelExportTable = ({ fileName, tableData }: IExcelExportTable) => {
  return (
    <IconButtonWithTooltip
      toolTipKey="exportTemplateToolTip"
      toolTipTitle="Export Import Template"
      toolTipPlacement="bottom-end"
      icon={() => {
        const ExcelFile = ReactExport.ExcelFile;
        const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
        const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

        return (
          <ExcelFile element={<ArrowUpwardOutlinedIcon />} fileName={fileName}>
            {Object.keys(tableData).map((sheetName, i) => {
              const { data, columns } = tableData[sheetName];

              return (
                <ExcelSheet key={i} data={data} name={sheetName}>
                  {columns.map((column, j) => {
                    const { label, value } = column;
                    return <ExcelColumn key={j} label={label} value={value} />;
                  })}
                </ExcelSheet>
              );
            })}
          </ExcelFile>
        );
      }}
    />
  );
};

export default ExcelExportTable;
