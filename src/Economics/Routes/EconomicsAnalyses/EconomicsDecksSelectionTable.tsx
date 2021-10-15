import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import React from "react";
import { Column } from "react-data-griddex";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import { ValueType } from "react-select";
import { SizeMe } from "react-sizeme";
import { createSelectorCreator, defaultMemoize } from "reselect";
import ApexSelectRS from "../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import ApexGrid from "../../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { IRawRow } from "../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { persistSelectedIdTitleAction } from "../../../Application/Redux/Actions/ApplicationActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { IApplicationStoredDataRow } from "../../../Application/Types/ApplicationTypes";
import generateSelectOptions from "../../../Application/Utils/GenerateSelectOptions";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const economicsSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer,
  (reducer) => reducer
);

const EconomicsDecksSelectionTable = () => {
  const dispatch = useDispatch();
  const wc = "storedDataWorkflows";

  const economicsWCSelector = createDeepEqualSelector(
    (state: RootState) => state.economicsReducer[wc],
    (wc) => wc
  );

  const { economicsCostsRevenuesDeckStored, economicsParametersDeckStored } =
    useSelector(economicsWCSelector);

  const {
    selectedCostsRevenuesInputDeckTitle,
    selectedEconomicsParametersInputDeckTitle,
  } = useSelector(economicsSelector);

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
      value: ValueType<ISelectOption, false>,
      row: IRawRow
    ) => {
      const rowSn = row.sn as number;
      const type = row.type as string;

      const selectedValue = value && value.label;
      const selectedTitle = selectedValue as string;

      if (type === "Economics Costs & Revenues") {
        const selectedDeck = economicsCostsRevenuesDeckStored.filter(
          (row: IApplicationStoredDataRow) => row.title === selectedTitle
        )[0];

        if (selectedDeck) {
          const { id, title } = selectedDeck;

          persistSelectedIdTitleAction &&
            dispatch(
              persistSelectedIdTitleAction("economicsReducer", {
                selectedCostsRevenuesInputDeckId: id,
                selectedCostsRevenuesInputDeckTitle: title,
              })
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
              handleSelect={(value: ValueType<ISelectOption, false>) =>
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

  return (
    <div style={{ width: "95%", height: 120 }}>
      <SizeMe monitorHeight refreshRate={32}>
        {({ size }) => (
          <ApexGrid
            columns={columns}
            rows={rows}
            newTableRowHeight={35}
            onRowsChange={setRows}
            size={size}
            autoAdjustTableDim={false}
            staticTableHeight={112}
          />
        )}
      </SizeMe>
    </div>
  );
};

export default EconomicsDecksSelectionTable;
