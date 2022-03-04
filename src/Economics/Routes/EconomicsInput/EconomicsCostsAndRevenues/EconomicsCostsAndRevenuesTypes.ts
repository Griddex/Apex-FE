import { ButtonProps } from "../../../../Application/Components/Dialogs/DialogTypes";
import { ISelectOption } from "../../../../Application/Components/Selects/SelectItemsType";
import { IRawRow } from "../../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { TAllWorkflowProcesses } from "../../../../Application/Components/Workflows/WorkflowTypes";
import { TUseState } from "../../../../Application/Types/ApplicationTypes";
import { costsRevenueAggregationLevelOptions } from "../../../Data/EconomicsData";
import { TDevScenarioNames } from "../../EconomicsAnalyses/EconomicsAnalysesTypes";

export interface IEconomicsCostsAndRevenuesLayouts {
  excel: JSX.Element;
  database: JSX.Element;
  manual: JSX.Element;
  apexforecast: JSX.Element;
  storeddeck: JSX.Element;
}

export type IdType = {
  dataInputId: keyof IEconomicsCostsAndRevenuesLayouts;
};

export interface IAggregateButtonProps extends ButtonProps {
  scenarioName: TDevScenarioNames;
  willAllowHover: boolean;
}

export interface ICostsRevenues {
  basePath: string;
  costsRevenueAggregationLevelOption: ISelectOption;
  wkPs?: TAllWorkflowProcesses;
  oilDevelopmentRows?: IRawRow[];
  setOilDevelopmentRows?: TUseState<IRawRow[]>;
  oilDevelopmentNames?: string[];
  nagDevelopmentRows?: IRawRow[];
  setNAGDevelopmentRows?: TUseState<IRawRow[]>;
  nagDevelopmentNames?: string[];
  oilNAGDevelopmentRows?: IRawRow[];
  setOilNAGDevelopmentRows?: TUseState<IRawRow[]>;
  oilNAGDevelopmentNames?: string[];
}

export type TCostRev =
  | "costRevenuesOil"
  | "costRevenuesNAG"
  | "costRevenuesOil_NAG";
