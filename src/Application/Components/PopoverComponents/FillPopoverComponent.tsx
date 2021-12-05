import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import { Button, Typography, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { OnChangeValue } from "react-select";
import { TUseState } from "../../Types/ApplicationTypes";
import AnalyticsComp from "../Basic/AnalyticsComp";
import ApexSelectRS from "../Selects/ApexSelectRS";
import { ISelectOption } from "../Selects/SelectItemsType";
import ApexMuiSwitch from "../Switches/ApexMuiSwitch";
import { IRawRow } from "../Table/ReactDataGrid/ApexGridTypes";

const useStyles = makeStyles(() => ({
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    height: "auto",
    width: "100%",
    "& > *": { width: 30, height: 20, margin: 5 },
  },
}));

export interface IFillPopoverComponent {
  columnTitleOptions: ISelectOption[];
  upToOptions: ISelectOption[];
  downToOptions: ISelectOption[];
  currentRow: IRawRow;
  rows: IRawRow[];
  setRows: TUseState<IRawRow[]>;
}

const FillPopoverComponent = ({
  columnTitleOptions,
  upToOptions,
  downToOptions,
  currentRow,
  rows,
  setRows,
}: IFillPopoverComponent) => {
  const classes = useStyles();
  const theme = useTheme();

  const fillPopRef = React.useRef<HTMLDivElement>(null);
  const [columnTitleOption, setColumnTitleOption] = React.useState(
    columnTitleOptions[0]
  );
  const [willFillUp, setWillFillUp] = React.useState(false);
  const [upToOption, setUpToOption] = React.useState(upToOptions[0]);

  const [downToOption, setDownToOption] = React.useState(
    downToOptions[downToOptions.length - 1]
  );

  const currentValue = currentRow[columnTitleOption?.value as string];

  const ColumnSelect = () => (
    <ApexSelectRS
      valueOption={columnTitleOption as ISelectOption}
      data={columnTitleOptions}
      handleSelect={(option: OnChangeValue<ISelectOption, false>) => {
        setColumnTitleOption(option as ISelectOption);
      }}
      menuPortalTarget={fillPopRef.current as HTMLDivElement}
      isSelectOptionType={true}
      containerHeight={40}
    />
  );

  const DownToSelect = () => (
    <ApexSelectRS
      valueOption={downToOption as ISelectOption}
      data={downToOptions}
      handleSelect={(option: OnChangeValue<ISelectOption, false>) => {
        setDownToOption(option as ISelectOption);
      }}
      menuPortalTarget={fillPopRef.current as HTMLDivElement}
      isSelectOptionType={true}
      containerHeight={40}
    />
  );

  const UpToSelect = () => (
    <ApexSelectRS
      valueOption={upToOption as ISelectOption}
      data={upToOptions}
      handleSelect={(option: OnChangeValue<ISelectOption, false>) => {
        setUpToOption(option as ISelectOption);
      }}
      menuPortalTarget={fillPopRef.current as HTMLDivElement}
      isSelectOptionType={true}
      containerHeight={40}
    />
  );

  return (
    <div>
      <AnalyticsComp
        title="Column"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={<ColumnSelect />}
      />
      <AnalyticsComp
        title="Current Value"
        direction="Vertical"
        containerStyle={{ marginTop: 30 }}
        content={
          <Typography>
            {Array.isArray(currentValue)
              ? currentValue.join(", ")
              : currentValue.toString()}
          </Typography>
        }
      />

      <AnalyticsComp
        title="Fill Direction"
        direction="Vertical"
        containerStyle={{ marginTop: 30 }}
        content={
          <ApexMuiSwitch
            name={"fillUpOrDown"}
            handleChange={(event) => {
              const { checked } = event.target;

              setWillFillUp(checked);
            }}
            checked={willFillUp}
            checkedColor={theme.palette.success.main}
            notCheckedColor={theme.palette.common.white}
            hasLabels={true}
            leftLabel="Up"
            rightLabel="Down"
          />
        }
      />

      {willFillUp ? (
        <AnalyticsComp
          title="Down To"
          direction="Vertical"
          containerStyle={{ marginTop: 20 }}
          content={<DownToSelect />}
        />
      ) : (
        <AnalyticsComp
          title="Up To"
          direction="Vertical"
          containerStyle={{ marginTop: 20 }}
          content={<UpToSelect />}
        />
      )}
      <div className={classes.footer}>
        {willFillUp ? (
          <Button
            fullWidth
            style={{ width: 130, height: 30 }}
            variant="contained"
            color="primary"
            startIcon={<ArrowDownwardOutlinedIcon />}
            onClick={() => {
              const currentSN = currentRow.sn;
              const currentDataToFill =
                currentRow[columnTitleOption?.value as string];
              const currentUnitId = currentRow["unitId"];

              const newRows = rows.map((row) => {
                const { sn } = row;
                if (
                  sn > currentSN &&
                  sn <= parseInt(downToOption?.value as string)
                ) {
                  return {
                    ...row,
                    [columnTitleOption?.value as string]: currentDataToFill,
                    unitId: currentUnitId,
                  };
                } else {
                  return row;
                }
              });

              setRows(newRows);
            }}
          >
            Fill Down
          </Button>
        ) : (
          <Button
            fullWidth
            style={{ width: 130, height: 30 }}
            variant="contained"
            color="primary"
            startIcon={<ArrowUpwardOutlinedIcon color="primary" />}
            onClick={() => {
              const currentSN = currentRow.sn;
              const currentDataToFill =
                currentRow[columnTitleOption?.value as string];
              const currentUnitId = currentRow["unitId"];

              const newRows = rows.map((row) => {
                const { sn } = row;
                if (
                  sn < currentSN &&
                  sn >= parseInt(upToOption.value as string)
                ) {
                  return {
                    ...row,
                    [columnTitleOption?.value as string]: currentDataToFill,
                    unitId: currentUnitId,
                  };
                } else {
                  return row;
                }
              });

              setRows(newRows);
            }}
          >
            Fill Up
          </Button>
        )}
      </div>
    </div>
  );
};

export default FillPopoverComponent;
