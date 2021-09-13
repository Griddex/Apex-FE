import { Button, makeStyles, Typography, useTheme } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { ValueType } from "react-select";
import { TUseState } from "../../Types/ApplicationTypes";
import AnalyticsComp from "../Basic/AnalyticsComp";
import ApexSelectRS from "../Selects/ApexSelectRS";
import { ISelectOption } from "../Selects/SelectItemsType";
import ApexMuiSwitch from "../Switches/ApexMuiSwitch";
import { IRawRow } from "../Table/ReactDataGrid/ApexGridTypes";
import ArrowUpwardOutlinedIcon from "@material-ui/icons/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@material-ui/icons/ArrowDownwardOutlined";

const useStyles = makeStyles((theme) => ({
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
  const dispatch = useDispatch();

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

  return (
    <div>
      <AnalyticsComp
        title="Column Title"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ApexSelectRS
            valueOption={columnTitleOption as ISelectOption}
            data={columnTitleOptions}
            handleSelect={(option: ValueType<ISelectOption, false>) => {
              setColumnTitleOption(option as ISelectOption);
            }}
            menuPortalTarget={fillPopRef.current as HTMLDivElement}
            isSelectOptionType={true}
          />
        }
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
          content={
            <ApexSelectRS
              valueOption={downToOption as ISelectOption}
              data={downToOptions}
              handleSelect={(option: ValueType<ISelectOption, false>) => {
                setDownToOption(option as ISelectOption);
              }}
              menuPortalTarget={fillPopRef.current as HTMLDivElement}
              isSelectOptionType={true}
            />
          }
        />
      ) : (
        <AnalyticsComp
          title="Up To"
          direction="Vertical"
          containerStyle={{ marginTop: 20 }}
          content={
            <ApexSelectRS
              valueOption={upToOption as ISelectOption}
              data={upToOptions}
              handleSelect={(option: ValueType<ISelectOption, false>) => {
                setUpToOption(option as ISelectOption);
              }}
              menuPortalTarget={fillPopRef.current as HTMLDivElement}
              isSelectOptionType={true}
            />
          }
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

              const newRows = rows.map((row) => {
                const { sn } = row;
                if (
                  sn > currentSN &&
                  sn <= parseInt(downToOption?.value as string)
                ) {
                  return {
                    ...row,
                    [columnTitleOption?.value as string]: currentDataToFill,
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

              const newRows = rows.map((row) => {
                const { sn } = row;
                if (
                  sn < currentSN &&
                  sn >= parseInt(upToOption.value as string)
                ) {
                  return {
                    ...row,
                    [columnTitleOption?.value as string]: currentDataToFill,
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
