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
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
  selectedNames: string[];
  setSelectedNames: React.Dispatch<React.SetStateAction<string[]>>;
  selectedPathsUnfiltered: string[];
  setSelectedPathsUnfiltered: React.Dispatch<React.SetStateAction<string[]>>;
  dragDropTypes: string;
}
