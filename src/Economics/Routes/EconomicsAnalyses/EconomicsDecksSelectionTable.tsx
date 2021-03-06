import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import React from "react";
import { Column } from "react-data-griddex";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import { OnChangeValue } from "react-select";
import { SizeMe } from "react-sizeme";
import { createSelectorCreator, defaultMemoize } from "reselect";
import ApexSelectRS from "../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import ApexGrid from "../../../Application/Components/Table/ReactDataGrid/ApexGrid";
import {
  IRawRow,
  ISize,
} from "../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { persistSelectedIdTitleAction } from "../../../Application/Redux/Actions/ApplicationActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { IApplicationStoredDataRow } from "../../../Application/Types/ApplicationTypes";
import generateSelectOptions from "../../../Application/Utils/GenerateSelectOptions";
import { updateEconomicsParameterAction } from "../../Redux/Actions/EconomicsActions";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const selectedCostsRevenuesInputDeckTitleSelector = createDeepEqualSelector(
  (state: RootState) =>
    state.economicsReducer.selectedCostsRevenuesInputDeckTitle,
  (data) => data
);
const selectedEconomicsParametersInputDeckTitleSelector =
  createDeepEqualSelector(
    (state: RootState) =>
      state.economicsReducer.selectedEconomicsParametersInputDeckTitle,
    (data) => data
  );

const EconomicsDecksSelectionTable = () => {
  const dispatch = useDispatch();
  const wc = "storedDataWorkflows";

  const economicsCostsRevenuesDeckStoredSelector = createDeepEqualSelector(
    (state: RootState) =>
      state.economicsReducer[wc]["economicsCostsRevenuesDeckStored"],
    (data) => data
  );
  const economicsParametersDeckStoredSelector = createDeepEqualSelector(
    (state: RootState) =>
      state.economicsReducer[wc]["economicsParametersDeckStored"],
    (data) => data
  );

  const economicsCostsRevenuesDeckStored = useSelector(
    economicsCostsRevenuesDeckStoredSelector
  );

  const economicsParametersDeckStored = useSelector(
    economicsParametersDeckStoredSelector
  );

  const selectedCostsRevenuesInputDeckTitle = useSelector(
    selectedCostsRevenuesInputDeckTitleSelector
  );
  const selectedEconomicsParametersInputDeckTitle = useSelector(
    selectedEconomicsParametersInputDeckTitleSelector
  );

  const economicsDeckTypes = [
    "Economics Costs & Revenues",
    "Economics Parameters",
  ];

  const economicsSelectedDeckOptions = {
    "Economics Costs & Revenues": generateSelectOptions(
      economicsCostsRevenuesDeckStored.map(
        (e: IApplicationStoredDataRow) => e.title
      )
    ),
    "Economics Parameters": generateSelectOptions(
      economicsParametersDeckStored.map(
        (e: IApplicationStoredDataRow) => e.title
      )
    ),
  };

  const costRevDeckTitle = selectedCostsRevenuesInputDeckTitle
    ? selectedCostsRevenuesInputDeckTitle
    : economicsCostsRevenuesDeckStored[0]?.title;

  const ecoParDeckTitle = selectedEconomicsParametersInputDeckTitle
    ? selectedEconomicsParametersInputDeckTitle
    : selectedEconomicsParametersInputDeckTitle[0]?.title;

  const initialRows = economicsDeckTypes.map((type, i) => {
    return {
      sn: i + 1,
      type,
      deck: i === 0 ? costRevDeckTitle : ecoParDeckTitle,
    };
  });

  const [rows, setRows] = React.useState(initialRows);

  const generateColumns = () => {
    const handleEconomicsDeckTitleChange = (
      value: OnChangeValue<ISelectOption, false>,
      row: IRawRow
    ) => {
      const rowSn = row.sn as number;
      const type = row.type as string;

      const selectedValue = value && value.label;
      const selectedTitle = selectedValue as string;

      if (type === "Economics Costs & Revenues") {
        const selectedDeck = economicsCostsRevenuesDeckStored.find(
          (row: IApplicationStoredDataRow) => row.title === selectedTitle
        );

        if (selectedDeck) {
          const { id, title, aggregationLevelOption } = selectedDeck;

          persistSelectedIdTitleAction &&
            dispatch(
              persistSelectedIdTitleAction("economicsReducer", {
                selectedCostsRevenuesInputDeckId: id,
                selectedCostsRevenuesInputDeckTitle: title,
              })
            );

          dispatch(
            updateEconomicsParameterAction(
              "costsRevenueAggregationLevelOption",
              aggregationLevelOption
            )
          );
        }
      } else {
        const selectedDeck = economicsParametersDeckStored.filter(
          (row: IApplicationStoredDataRow) => row.title === selectedTitle
        )[0];

        if (selectedDeck) {
          const { id, title } = selectedDeck;

          persistSelectedIdTitleAction &&
            dispatch(
              persistSelectedIdTitleAction("economicsReducer", {
                selectedEconomicsParametersInputDeckId: id,
                selectedEconomicsParametersInputDeckTitle: title,
              })
            );
        }
      }

      const selectedRow = rows[rowSn - 1];
      rows[rowSn - 1] = { ...selectedRow, deck: selectedTitle };
    };
    const columns: Column<IRawRow>[] = [
      {
        key: "sn",
        name: "SN",
        resizable: true,
        width: 70,
      },
      {
        key: "actions",
        name: "ACTIONS",
        editable: false,
        formatter: ({ row }) => (
          <ApexFlexContainer>
            <VisibilityOutlinedIcon
              onClick={() => alert(`View Row is:${row}`)}
            />
            <LockOutlinedIcon onClick={() => alert(`Delete Row is:${row}`)} />
          </ApexFlexContainer>
        ),
        width: 100,
      },
      {
        key: "type",
        name: "DECK TYPE",
        resizable: true,
        width: 220,
      },
      {
        key: "deck",
        name: "SELECTED DECK TITLE",
        resizable: true,
        formatter: ({ row }) => {
          const type = row.type as keyof typeof economicsSelectedDeckOptions;
          const deck = row.deck as string;
          const valueOption = generateSelectOptions([deck])[0];
          const options = economicsSelectedDeckOptions[type];

          return (
            <ApexSelectRS
              valueOption={valueOption}
              data={options}
              handleSelect={(value: OnChangeValue<ISelectOption, false>) =>
                handleEconomicsDeckTitleChange(value, row)
              }
              menuPortalTarget={document.body}
              isSelectOptionType={true}
            />
          );
        },
      },
    ];

    return columns;
  };

  const columns = generateColumns();

  const getApexGridProps = (size: ISize) => ({
    columns: columns,
    rows: rows,
    newTableRowHeight: 35,
    onRowsChange: setRows,
    size: size,
    autoAdjustTableDim: false,
    staticTableHeight: 112,
  });

  return (
    <div style={{ width: "95%", height: 120 }}>
      <SizeMe monitorHeight refreshRate={32}>
        {({ size }) => <ApexGrid apexGridProps={getApexGridProps(size)} />}
      </SizeMe>
    </div>
  );
};

export default EconomicsDecksSelectionTable;
