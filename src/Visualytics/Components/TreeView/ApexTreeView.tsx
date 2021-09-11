import { makeStyles } from "@material-ui/core/styles";
import SvgIcon from "@material-ui/core/SvgIcon";
import TreeView from "@material-ui/lab/TreeView";
import React from "react";
import ApexTreeViewRenderer from "./ApexTreeViewRenderer";
import { IApexTreeView } from "./ApexTreeViewTypes";

function MinusSquare(props: any) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props: any) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

const useStyles = makeStyles((theme) => ({
  rootTreeView: {
    height: 250,
    width: "100%",
    maxWidth: 300,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: 500,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    border: "1px solid #C4C4C4",
    overflow: "auto",
  },
  itemIcon: {
    color: theme.palette.primary.main,
    minWidth: 30,
  },
  listDialogContent: { display: "flex", flexDirection: "column" },
  listBorder: {
    height: 200,
    overflow: "auto",
    border: "1px solid #F7F7F7",
  },
  rootLabel: { marginRight: 0, marginLeft: 0, marginBottom: 0 },
}));

export default function ApexTreeView({
  rootTree,
  selectedIds,
  selectedNames,
  setSelectedIds,
  setSelectedNames,
  selectedPathsUnfiltered,
  setSelectedPathsUnfiltered,
  dragDropTypes,
}: IApexTreeView) {
  const classes = useStyles();

  const initExpanded = rootTree?.children?.map(
    (scenarioNodes) => scenarioNodes.id
  );

  const [expanded, setExpanded] = React.useState<string[]>(
    initExpanded as string[]
  );
  const [selected, setSelected] = React.useState<string[]>([]);

  const handleToggle = (event: React.ChangeEvent<any>, nodeIds: string[]) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event: React.ChangeEvent<any>, nodeIds: string[]) => {
    setSelected(nodeIds);
  };

  return (
    <TreeView
      className={classes.rootTreeView}
      expanded={expanded}
      defaultCollapseIcon={<MinusSquare />}
      defaultExpandIcon={<PlusSquare />}
      selected={selected}
      onNodeToggle={handleToggle}
      onNodeSelect={handleSelect}
    >
      <ApexTreeViewRenderer
        rootTree={rootTree}
        selectedIds={selectedIds}
        selectedNames={selectedNames}
        setSelectedIds={setSelectedIds}
        setSelectedNames={setSelectedNames}
        selectedPathsUnfiltered={selectedPathsUnfiltered}
        setSelectedPathsUnfiltered={setSelectedPathsUnfiltered}
        dragDropTypes={dragDropTypes}
      />
    </TreeView>
  );
}
