import {
  alpha,
  FormControlLabel,
  makeStyles,
  withStyles,
} from "@material-ui/core";
import TreeItem, { TreeItemProps } from "@material-ui/lab/TreeItem";
import React from "react";
import { useDrag } from "react-dnd";
import ApexCheckbox2 from "../../../Application/Components/Checkboxes/ApexCheckbox2";
import { IApexTreeView, RenderTree } from "./ApexTreeViewTypes";

const StyledTreeItem = withStyles((theme) => ({
  iconContainer: {
    "& .close": {
      opacity: 0.3,
    },
  },
  group: {
    marginLeft: 7,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}))((props: TreeItemProps) => {
  return <TreeItem {...props} />;
});

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

export interface IApexTreeViewRenderer {
  scenarioNodes: RenderTree;
}

const ApexTreeViewRenderer = ({
  rootTree: scenarioNodes,
  selectedIds,
  selectedNames,
  setSelectedIds,
  setSelectedNames,
  selectedPathsUnfiltered,
  setSelectedPathsUnfiltered,
  dragDropTypes,
}: IApexTreeView) => {
  const classes = useStyles();
  const { id, name, title, path } = scenarioNodes;

  let newName = "";
  let newTitle = "";
  if (path) {
    const sensitivitiesJoined = path?.split("@#$%")[3];

    newName = `${name}_${sensitivitiesJoined}`;
    newTitle = `${title}_${sensitivitiesJoined}`;
  } else {
    newName = name as string;
    newTitle = title as string;
  }

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: dragDropTypes,
      item: { id, name: newName, title: newTitle, path },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult();
      },
      collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
    }),
    []
  );

  const opacity = isDragging ? 0.4 : 1;

  const getChildById = (node: RenderTree, id: string) => {
    let idArray: string[] = [];
    let titleArray: string[] = [];
    let pathArray: string[] = [];

    const getAllChildren = (nodes: RenderTree | null) => {
      if (nodes === null) return [];

      idArray.push(nodes.id);
      titleArray.push(nodes.title as NonNullable<RenderTree["title"]>);
      pathArray.push(nodes.path as string);

      if (Array.isArray(nodes.children)) {
        nodes.children.forEach((node) => {
          idArray = [...idArray, ...getAllChildren(node)[0]];
          idArray = idArray.filter((v, i) => idArray.indexOf(v) === i);

          titleArray = [...titleArray, ...getAllChildren(node)[1]];
          titleArray = titleArray.filter((v, i) => titleArray.indexOf(v) === i);

          pathArray = [...pathArray, ...getAllChildren(node)[1]];
          pathArray = pathArray.filter((v, i) => pathArray.indexOf(v) === i);
        });
      }

      return [idArray, titleArray, pathArray];
    };

    const getNodeById = (nodes: RenderTree, id: string) => {
      if (nodes.id === id) {
        return nodes;
      } else if (Array.isArray(nodes.children)) {
        let result = null;

        nodes.children.forEach((node) => {
          if (getNodeById(node, id)) {
            result = getNodeById(node, id);
          }
        });

        return result;
      }

      return null;
    };

    return getAllChildren(getNodeById(node, id));
  };

  const getOnChange = (checked: boolean, scenarioNodes: RenderTree) => {
    const allIdNodes: string[] = getChildById(
      scenarioNodes,
      scenarioNodes.id
    )[0];

    const allNameNodes: string[] = getChildById(
      scenarioNodes,
      scenarioNodes.id
    )[1];

    const allPathNodes: string[] = getChildById(
      scenarioNodes,
      scenarioNodes.id
    )[2];

    let idArray = checked
      ? [...selectedIds, ...allIdNodes]
      : selectedIds.filter((value) => !allIdNodes.includes(value));
    idArray = idArray.filter((v, i) => idArray.indexOf(v) === i);

    setSelectedIds(idArray);

    let titleArray = checked
      ? [...selectedNames, ...allNameNodes]
      : selectedNames.filter((value) => !allNameNodes.includes(value));
    titleArray = titleArray.filter((v, i) => titleArray.indexOf(v) === i);

    setSelectedNames(titleArray);

    let pathArray = checked
      ? [...selectedPathsUnfiltered, ...allPathNodes]
      : selectedPathsUnfiltered.filter(
          (value) => !allPathNodes.includes(value)
        );
    pathArray = pathArray.filter((v, i) => pathArray.indexOf(v) === i);

    setSelectedPathsUnfiltered(pathArray);
  };

  return (
    <StyledTreeItem
      key={scenarioNodes.id}
      nodeId={scenarioNodes.id}
      label={
        <FormControlLabel
          control={
            <ApexCheckbox2
              checked={selectedIds.some((item) => item === scenarioNodes.id)}
              onChange={(event) =>
                getOnChange(event.currentTarget.checked, scenarioNodes)
              }
              onClick={(e) => e.stopPropagation()}
            />
          }
          label={
            <div ref={drag} style={{ opacity }}>
              {scenarioNodes.title}
            </div>
          }
          key={scenarioNodes.id}
          classes={{ root: classes.rootLabel }}
        />
      }
    >
      {Array.isArray(scenarioNodes.children)
        ? scenarioNodes.children.map((node, i) => (
            <ApexTreeViewRenderer
              key={i}
              rootTree={node}
              selectedIds={selectedIds}
              selectedNames={selectedNames}
              setSelectedIds={setSelectedIds}
              setSelectedNames={setSelectedNames}
              selectedPathsUnfiltered={selectedPathsUnfiltered}
              setSelectedPathsUnfiltered={setSelectedPathsUnfiltered}
              dragDropTypes={dragDropTypes}
            />
          ))
        : null}
    </StyledTreeItem>
  );
};

export default ApexTreeViewRenderer;
