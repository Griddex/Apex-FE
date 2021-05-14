import { ButtonProps } from "../../../../Application/Components/Dialogs/DialogTypes";
import { TDevScenarioNames } from "../../EconomicsAnalyses/EconomicsAnalysesTypes";

export interface IEconomicsCostsAndRevenuesLayouts {
  excel: JSX.Element;
  database: JSX.Element;
  manual: JSX.Element;
  apexforecast: JSX.Element;
  approveddeck: JSX.Element;
}

export type IdType = {
  dataInputId: keyof IEconomicsCostsAndRevenuesLayouts;
};

export interface IAggregateButtonProps extends ButtonProps {
  scenarioName: TDevScenarioNames;
}
