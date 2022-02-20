import { TUseState } from "../../../Application/Types/ApplicationTypes";
import { TEconomicsResultsCase } from "../../../Economics/Routes/EconomicsAnalyses/EconomicsAnalysesTypes";

export interface RenderTree {
  id: string;
  name: string;
  title?: string;
  path?: string;
  children?: RenderTree[];
}

export interface IApexTreeView {
  rootTree: RenderTree;
  selectedIds: string[];
  setSelectedIds: TUseState<string[]>;
  selectedNames: string[];
  setSelectedNames: TUseState<string[]>;
  selectedPathsUnfiltered: string[];
  setSelectedPathsUnfiltered: TUseState<string[]>;
  dragDropTypes: string;
  height: number;
  droppedIds?: string[];
  economicsResultsCase?: TEconomicsResultsCase;
}

export type TTreeStackObj = {
  nestingLevel: number;
  node: RenderTree;
};
export type TTreeStack = TTreeStackObj[];
