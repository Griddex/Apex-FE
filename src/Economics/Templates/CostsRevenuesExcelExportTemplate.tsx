import React from "react";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ReactExport from "react-export-excel";
import IconButtonWithTooltip from "../../Application/Components/IconButtons/IconButtonWithTooltip";

const CostsRevenuesExcelExportTemplate = () => {
  return (
    <IconButtonWithTooltip
      toolTipKey="exportTemplateToolTip"
      toolTipTitle="Template"
      toolTipPlacement="bottom-end"
      icon={() => {
        const ExcelFile = ReactExport.ExcelFile;
        const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
        const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

        const dataSet1 = [
          {
            name: "Johson",
            amount: 30000,
            sex: "M",
            is_married: true,
          },
          {
            name: "Monika",
            amount: 355000,
            sex: "F",
            is_married: false,
          },
          {
            name: "John",
            amount: 250000,
            sex: "M",
            is_married: false,
          },
          {
            name: "Josef",
            amount: 450500,
            sex: "M",
            is_married: true,
          },
        ];

        const dataSet2 = [
          {
            name: "Johnson",
            total: 25,
            remainig: 16,
          },
          {
            name: "Josef",
            total: 25,
            remainig: 7,
          },
        ];

        return (
          <ExcelFile element={<ArrowUpwardOutlinedIcon color="primary" />}>
            <ExcelSheet data={dataSet1} name="Employees">
              <ExcelColumn label="Name" value="name" />
              <ExcelColumn label="Wallet Money" value="amount" />
              <ExcelColumn label="Gender" value="sex" />
              <ExcelColumn
                label="Marital Status"
                value={(col: any) => (col.is_married ? "Married" : "Single")}
              />
            </ExcelSheet>
            <ExcelSheet data={dataSet2} name="Leaves">
              <ExcelColumn label="Name" value="name" />
              <ExcelColumn label="Total Leaves" value="total" />
              <ExcelColumn label="Remaining Leaves" value="remaining" />
            </ExcelSheet>
          </ExcelFile>
        );
      }}
    />
  );
};

export default CostsRevenuesExcelExportTemplate;
