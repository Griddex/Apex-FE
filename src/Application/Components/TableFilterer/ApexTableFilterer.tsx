import AllInclusiveOutlinedIcon from "@mui/icons-material/AllInclusiveOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import { Button, IconButton, SvgIconTypeMap, useTheme } from "@mui/material";
import Menu from "@mui/material/Menu";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import makeStyles from "@mui/styles/makeStyles";
import uniq from "lodash.uniq";
import React, { ChangeEvent } from "react";
import { OnChangeValue } from "react-select";
import ApexSelectRS from "../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import { TUseState } from "../../Types/ApplicationTypes";
import DialogOneCancelButtons from "../DialogButtons/DialogOneCancelButtons";
import ApexListMultiOptions from "../List/ApexListMultiOptions";
import { IRawRow } from "../Table/ReactDataGrid/ApexGridTypes";

const useStyles = makeStyles((theme) => ({
  listItemAvatar: {
    textAlign: "center",
    color: theme.palette.primary.main,
    fontWeight: "bold",
    minWidth: 40,
  },
  label: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export interface IApexTableFilterer {
  aggregationLevelOption: ISelectOption;
  setAggregationLevelOption: TUseState<ISelectOption>;
  aggregationLevelOptions: ISelectOption[];
  rows: IRawRow[];
  setRows: TUseState<IRawRow[]>;
  Icon: OverridableComponent<SvgIconTypeMap<any, "svg">> & {
    muiName: string;
  };
  width?: number | string;
}

const ApexTableFilterer = ({
  aggregationLevelOption,
  aggregationLevelOptions,
  setAggregationLevelOption,
  rows,
  setRows,
  Icon,
  width,
}: IApexTableFilterer) => {
  const classes = useStyles();
  const theme = useTheme();
  const mapRef = React.useRef<HTMLDivElement>(null);
  const rowsRef = React.useRef(rows);
  console.log("🚀 ~ file: ApexTableFilterer.tsx ~ line 56 ~ rowsRef", rowsRef);

  const [selectedOptions, setSelectedOptions] = React.useState(
    [] as ISelectOption[]
  );

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [filtered, setFiltered] = React.useState(false);

  const apexListemAction = (option: ISelectOption) => {
    const optionIsFound = selectedOptions.find(
      (o) => o?.value === option?.value
    );
    console.log(
      "🚀 ~ file: ApexTableFilterer.tsx ~ line 67 ~ apexListemAction ~ optionIsFound",
      optionIsFound
    );

    if (optionIsFound) {
      setSelectedOptions((prev) => {
        const newOptions = [...prev];
        console.log(
          "🚀 ~ file: ApexTableFilterer.tsx ~ line 75 ~ setSelectedOptions ~ newOptions",
          newOptions
        );
        const currIdx = newOptions.findIndex((o) => o?.value === option?.value);
        const currSelectOptions = newOptions.splice(currIdx, 1);
        console.log(
          "🚀 ~ file: ApexTableFilterer.tsx ~ line 76 ~ setSelectedOptions ~ currSelectOptions",
          currSelectOptions
        );

        return currSelectOptions;
      });
    } else {
      setSelectedOptions((prev) => {
        const newOptions = [...prev];
        newOptions.push(option);
        return newOptions;
      });
    }
  };

  const contentListOptions = React.useMemo(() => {
    const values = rows.map(
      (row) => row[aggregationLevelOption?.value as string]
    ) as string[];
    const uniqValues = uniq(values).filter((v) => (v as string) !== "");

    return uniqValues.map((v) => ({ value: v, label: v }));
  }, [aggregationLevelOption?.value, rows]);

  //   const [contentListOptions, setContentListOptions] = React.useState(
  //     [] as ISelectOption[]
  //   );

  //   React.useEffect(() => {
  //     const values = rows.map(
  //       (row) => row[aggregationLevelOption?.value as string]
  //     ) as string[];
  //     const uniqValues = uniq(values).filter((v) => (v as string) !== "");

  //     const options = uniqValues.map((v) => ({ value: v, label: v }));

  //     setContentListOptions(options);
  //   }, [aggregationLevelOption?.value]);

  const handleClick = (event: ChangeEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const setFilteredRows = (
    rows: IRawRow[],
    selectedOptions: ISelectOption[]
  ) => {
    const filteredRows = rows.filter((row) => {
      const aggValue = row["project"] as string;

      const aggValueIsFound = selectedOptions.find(
        (o) => o?.value === aggValue
      );
      if (aggValueIsFound) return row;
    });

    setRows(filteredRows);
    setFiltered(true);
  };

  return (
    <div style={{ cursor: "context-menu", backgroundColor: "#F7F7F7" }}>
      <Button
        className={classes.label}
        onClick={handleClick}
        startIcon={
          <ShowChartOutlinedIcon htmlColor={theme.palette.grey["800"]} />
        }
        endIcon={
          <KeyboardArrowDownIcon htmlColor={theme.palette.grey["800"]} />
        }
        style={{
          height: 28,
          backgroundColor: theme.palette.primary.light,
          border: `1px solid ${theme.palette.primary.main}`,
          width: 250,
          color: theme.palette.grey["800"],
        }}
      >
        {`${aggregationLevelOption.label} ${filtered ? "(Filtered)" : ""}`}
      </Button>
      <Menu
        ref={mapRef}
        style={{ paddingRight: 8 }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div style={{ width: width ? width : 300 }}>
          <ApexFlexContainer height={40} justifyContent="space-between">
            <ApexSelectRS
              valueOption={aggregationLevelOption}
              data={aggregationLevelOptions}
              handleSelect={(option: OnChangeValue<ISelectOption, false>) => {
                setAggregationLevelOption(option as ISelectOption);
              }}
              menuPortalTarget={mapRef.current as HTMLDivElement}
              isSelectOptionType={true}
              containerHeight={30}
            />
            <IconButton
              style={{
                height: "28px",
                backgroundColor: theme.palette.primary.light,
                border: `1px solid ${theme.palette.primary.main}`,
                borderRadius: 2,
                marginLeft: 4,
              }}
              onClick={() => {}}
              size="large"
            >
              <AllInclusiveOutlinedIcon />
            </IconButton>
          </ApexFlexContainer>
          <ApexListMultiOptions
            contentListOptions={contentListOptions}
            selectedOptions={selectedOptions}
            apexListemAction={apexListemAction}
            Icon={Icon}
          />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            {DialogOneCancelButtons(
              [true, true],
              [false, false],
              [handleClose, () => setFilteredRows(rows, selectedOptions)],
              "Filter",
              "filter",
              false,
              "All"
            )}
          </div>
        </div>
      </Menu>
    </div>
  );
};

export default ApexTableFilterer;
