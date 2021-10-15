import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import React from "react";
import ReactExport from "react-export-excel";
import IconButtonWithTooltip from "../IconButtons/IconButtonWithTooltip";
import { ISelectOption } from "./../Selects/SelectItemsType";

export interface IExcelSheetData<T> {
  data: T[];
  columns: ISelectOption[];
}

export interface IExcelExportTable<T> {
  fileName: string;
  tableData: Record<string, IExcelSheetData<T>>;
}

export type TDataRow = Record<string, React.Key | Record<string, React.Key>>;

const ExcelExportTable = <T extends any>({
  fileName,
  tableData,
}: IExcelExportTable<T>) => {
  return (
    <IconButtonWithTooltip
      toolTipKey="exportTemplateToolTip"
      toolTipTitle="Export"
      toolTipPlacement="bottom-end"
      icon={() => {
        const ExcelFile = ReactExport.ExcelFile;
        const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
        const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

        return (
          <ExcelFile
            element={
              <div style={{ display: "flex" }}>
                <FileDownloadOutlinedIcon />
              </div>
            }
            filename={fileName}
          >
            {Object.keys(tableData).map((sheetName, i) => {
              const { data, columns } = tableData[sheetName];

              const dataFinal = data.map((row) => {
                const rowDefined = row as TDataRow;

                const rowData = Object.keys(rowDefined).reduce((acc, key) => {
                  const val = rowDefined[key] as TDataRow;

                  if (Array.isArray(val)) {
                    return {
                      ...acc,
                      [key]: val.map((o) => o["name"]).join(", "),
                    };
                  } else if (typeof val === "object") {
                    return { ...acc, [key]: val["name"] };
                  } else {
                    return { ...acc, [key]: val };
                  }
                }, {});

                return rowData;
              });

              return (
                <ExcelSheet key={i} data={dataFinal} name={sheetName}>
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
