import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { useDispatch } from "react-redux";
import { OnChangeValue } from "react-select";
import BaseButtons from "../../../../Application/Components/BaseButtons/BaseButtons";
import AnalyticsComp from "../../../../Application/Components/Basic/AnalyticsComp";
import ApexSelectRS from "../../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../../Application/Components/Selects/SelectItemsType";
import ApexFlexContainer from "../../../../Application/Components/Styles/ApexFlexContainer";
import { IInputWorkflows } from "../../../../Application/Components/Workflows/WorkflowTypes";
import { showDialogAction } from "../../../../Application/Redux/Actions/DialogsAction";
import { confirmationDialogParameters } from "../../../../Import/Components/DialogParameters/ConfirmationDialogParameters";
import AggregatedButtons from "../../../Components/AggregatedButtons/AggregatedButtons";
import {
  backendDevScenarioOptions,
  developmentScenarioOptions,
  developmentScenariosMap,
  forecastCaseOptions,
  nagDevelopmentNames,
  oilDevelopmentNames,
  oilNAGDevelopmentNames,
} from "../../../Data/EconomicsData";
import { updateEconomicsParameterAction } from "../../../Redux/Actions/EconomicsActions";
import initializeCostRevenuesData from "../../../Utils/InitializeCostRevenuesData";
import {
  TBackendDevScenarioTitles,
  TDevScenarioNames,
} from "../../EconomicsAnalyses/EconomicsAnalysesTypes";
import CostsAndRevenueManualNAG from "./CostsAndRevenueManualNAG";
import CostsAndRevenueManualOil from "./CostsAndRevenueManualOil";
import CostsAndRevenueManualOilNAG from "./CostsAndRevenueManualOilNAG";
import { IAggregateButtonProps } from "./EconomicsCostsAndRevenuesTypes";

const useStyles = makeStyles((theme) => ({
  rootStoredData: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#FFF",
    boxShadow: theme.shadows[3],
    padding: 10,
  },
  workflowBody: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "97%",
    alignItems: "center",
    justifyContent: "center",
  },
  chart: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "20%",
  },
}));

export default function CostsAndRevenueManual({
  wkCy,
  wkPs,
  finalAction,
  basePathStr,
  forecastEconomicsAggregated,
}: IInputWorkflows) {
  const forecastEconomicsAggregatedDefined =
    forecastEconomicsAggregated as Record<string, any[]>;
  const initialRowsLength = 10;
  const basePath = basePathStr ? basePathStr : `${wkCy}.${wkPs}`;

  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const [devOption, setDevOption] = React.useState<ISelectOption>(
    developmentScenarioOptions[0]
  );
  const devVal = devOption.value as TDevScenarioNames;

  const [forecastCaseOption, setForecastCaseOption] =
    React.useState<ISelectOption>(forecastCaseOptions[1]);

  const initButtonsData =
    wkPs === "economicsCostsRevenuesDeckApexForecast"
      ? Object.keys(forecastEconomicsAggregatedDefined).reduce((acc, title) => {
          if (
            Object.keys(forecastEconomicsAggregatedDefined[title]).length > 0
          ) {
            const backendTitle = title as TBackendDevScenarioTitles;
            const devName = developmentScenariosMap[backendTitle];

            const backendValue = backendDevScenarioOptions[backendTitle].value;
            const backendLabel = backendDevScenarioOptions[backendTitle].label;

            const btnData = {
              title: backendTitle,
              scenarioName: devName,
              variant: "outlined",
              color: "primary",
              handleAction: () =>
                setDevOption({ value: backendValue, label: backendLabel }),
            } as IAggregateButtonProps;

            return [...acc, btnData];
          } else {
            return acc;
          }
        }, [] as IAggregateButtonProps[])
      : ([
          {
            title: devOption.label,
            scenarioName: devOption.value,
            variant: "outlined",
            color: "primary",
            handleAction: () => setDevOption(devOption as ISelectOption),
          },
        ] as IAggregateButtonProps[]);

  const [buttonsData, setButtonsData] = React.useState(initButtonsData);

  const {
    initialOilDevelopmentRows,
    initialNAGDevelopmentRows,
    initialOilNAGDevelopmentRows,
  } = React.useMemo(
    () =>
      initializeCostRevenuesData(
        forecastEconomicsAggregatedDefined,
        initialRowsLength,
        oilDevelopmentNames,
        nagDevelopmentNames,
        oilNAGDevelopmentNames
      ),
    []
  );

  const [oilDevelopmentRows, setOilDevelopmentRows] = React.useState(
    initialOilDevelopmentRows
  );

  const [nagDevelopmentRows, setNAGDevelopmentRows] = React.useState(
    initialNAGDevelopmentRows
  );

  const [oilNAGDevelopmentRows, setOilNAGDevelopmentRows] = React.useState(
    initialOilNAGDevelopmentRows
  );

  const DevelopmentScenarios = () => (
    <ApexSelectRS
      valueOption={devOption}
      data={developmentScenarioOptions}
      handleSelect={(row: OnChangeValue<ISelectOption, false>) => {
        const path = `${basePath}.developmentScenarios`;
        const value = row?.value as string;
        const label = row?.label as string;

        dispatch(updateEconomicsParameterAction(path, value));

        setButtonsData((prev) => {
          if (buttonsData.map((obj) => obj.title).includes(label)) return prev;
          else {
            const btnData = {
              title: label,
              scenarioName: value,
              variant: "outlined",
              color: "primary",
              handleAction: () => setDevOption(row as ISelectOption),
            } as IAggregateButtonProps;

            return [...prev, btnData];
          }
        });
      }}
      menuPortalTarget={document.body}
      isSelectOptionType={true}
      containerHeight={40}
    />
  );

  const ForecastCases = () => (
    <ApexSelectRS
      valueOption={forecastCaseOption}
      data={forecastCaseOptions}
      handleSelect={(option: OnChangeValue<ISelectOption, false>) => {
        const path = `${basePath}.forecastCase`;
        const value = option?.value as string;

        dispatch(updateEconomicsParameterAction(path, value));

        setForecastCaseOption(option as ISelectOption);
      }}
      menuPortalTarget={document.body}
      isSelectOptionType={true}
      containerHeight={40}
    />
  );

  const renderTable = () => {
    if (devVal === "oilDevelopment") {
      return (
        <CostsAndRevenueManualOil
          wkPs={wkPs}
          basePath={basePath}
          oilDevelopmentRows={oilDevelopmentRows}
          setOilDevelopmentRows={setOilDevelopmentRows}
          oilDevelopmentNames={oilDevelopmentNames}
        />
      );
    } else if (devVal === "nagDevelopment") {
      return (
        <CostsAndRevenueManualNAG
          wkPs={wkPs}
          basePath={basePath}
          nagDevelopmentRows={nagDevelopmentRows}
          setNAGDevelopmentRows={setNAGDevelopmentRows}
          nagDevelopmentNames={nagDevelopmentNames}
        />
      );
    } else {
      return (
        <CostsAndRevenueManualOilNAG
          wkPs={wkPs}
          basePath={basePath}
          oilNAGDevelopmentRows={oilNAGDevelopmentRows}
          setOilNAGDevelopmentRows={setOilNAGDevelopmentRows}
          oilNAGDevelopmentNames={oilNAGDevelopmentNames}
        />
      );
    }
  };

  const checkedRowSN = wkPs === "economicsCostsRevenuesDeckManual" ? 1 : 0;
  const oilRevsIsFilledOnFirstRow = React.useMemo(
    () =>
      Object.values(oilDevelopmentRows[checkedRowSN]).filter((v) => v !== "")
        .length === 16,
    [oilDevelopmentRows]
  );

  const nagRevsIsFilledOnFirstRow = React.useMemo(
    () =>
      Object.values(nagDevelopmentRows[checkedRowSN]).filter((v) => v !== "")
        .length === 17,
    [nagDevelopmentRows]
  );

  const oilNAGRevsIsFilledOnFirstRow = React.useMemo(
    () =>
      Object.values(oilNAGDevelopmentRows[checkedRowSN]).filter((v) => v !== "")
        .length === 19,
    [oilNAGDevelopmentRows]
  );

  const allRevsIsFilledOnFirstRow =
    oilRevsIsFilledOnFirstRow ||
    nagRevsIsFilledOnFirstRow ||
    oilNAGRevsIsFilledOnFirstRow;

  React.useEffect(() => {
    dispatch(
      updateEconomicsParameterAction(
        `${basePath}.costRevenuesButtons`,
        buttonsData
      )
    );
  }, [devVal]);

  //TODO for some reason, manual workflow is updating all of them
  //Please trace and fix

  return (
    <div className={classes.rootStoredData}>
      <ApexFlexContainer
        justifyContent="space-between"
        moreStyles={{
          marginBottom: 10,
          height: 50,
          borderBottom: `1px solid ${theme.palette.grey[400]}`,
          paddingBottom: 10,
        }}
      >
        <ApexFlexContainer width="70%" justifyContent="flex-start">
          <AnalyticsComp
            title="Development Scenario"
            direction="Horizontal"
            containerStyle={{
              display: "flex",
              flexDirection: "row",
              width: 550,
            }}
            content={<DevelopmentScenarios />}
          />
          <AggregatedButtons
            buttonsData={buttonsData}
            setButtonsData={setButtonsData}
          />
        </ApexFlexContainer>

        <AnalyticsComp
          title="Forecast Case"
          direction="Vertical"
          containerStyle={{
            display: "flex",
            flexDirection: "row",
            width: 300,
          }}
          content={<ForecastCases />}
        />
      </ApexFlexContainer>
      {renderTable()}
      {wkPs === "economicsCostsRevenuesDeckManual" && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 10,
            marginBottom: 2,
            width: 200,
          }}
        >
          <BaseButtons
            buttonTexts={["Reset", "Save"]}
            variants={["contained", "contained"]}
            colors={["secondary", "primary"]}
            startIcons={[
              <RotateLeftIcon key={1} />,
              <SaveOutlinedIcon key={2} />,
            ]}
            disableds={[false, !allRevsIsFilledOnFirstRow]}
            shouldExecute={[true, true]}
            shouldDispatch={[false, false]}
            finalActions={[
              () => {
                const dialogParameters = confirmationDialogParameters(
                  "CostsRevenueManual_Reset_Confirmation",
                  "Reset Confirmation",
                  "textDialog",
                  `Do you want to reset this table?. 
                  You will lose all data up to current step.`,
                  true,
                  false,
                  () => {
                    if (devVal === "oilDevelopment") {
                      setOilDevelopmentRows(initialOilDevelopmentRows);
                    } else if (devVal === "nagDevelopment") {
                      setNAGDevelopmentRows(initialOilDevelopmentRows);
                    } else {
                      setOilNAGDevelopmentRows(initialOilNAGDevelopmentRows);
                    }
                  },
                  "Reset",
                  "reset"
                );

                dispatch(showDialogAction(dialogParameters));
              },
              () => finalAction && finalAction(),
            ]}
          />
        </div>
      )}
    </div>
  );
}
