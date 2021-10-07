import Checkbox from "@mui/material/Checkbox";
import SvgIcon from "@mui/material/SvgIcon";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { useDrag } from "react-dnd";
import { FixedSizeTree as Tree } from "react-vtree";
import ApexCheckbox2 from "../../../Application/Components/Checkboxes/ApexCheckbox2";
import {
  IApexTreeView,
  RenderTree,
  TTreeStack,
  TTreeStackObj,
} from "./ApexTreeViewTypes";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

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
  height,
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

  function* treeWalker(refresh: any): any {
    const stack = [] as TTreeStack;

    stack.push({
      nestingLevel: 0,
      node: rootTree,
    });

    while (stack.length !== 0) {
      const {
        node: { children = [], id, name, title, path },
        nestingLevel,
      } = stack.pop() as TTreeStackObj;

      const isOpened = yield refresh
        ? {
            id,
            name,
            title,
            path,
            isLeaf: children.length === 0,
            isOpenByDefault: false,
            nestingLevel,
          }
        : id;

      if (children.length !== 0 && isOpened) {
        for (let i = children.length - 1; i >= 0; i--) {
          stack.push({
            nestingLevel: nestingLevel + 1,
            node: children[i],
          });
        }
      }
    }
  }

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

  const ApexNode = ({
    height,
    data: { id, name, title, path, isLeaf, nestingLevel },
    isOpen,
    style,
    toggle,
    treeData: itemSize,
  }: any) => {
    const canOpen = height <= itemSize;

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

    return (
      <div
        style={{
          ...style,
          display: "flex",
          alignItems: "center",
          marginLeft: nestingLevel * 15 + (isLeaf ? 30 : 0),
        }}
      >
        {!isLeaf && (
          <button
            type="button"
            onClick={toggle}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 14,
              height: 14,
              borderWidth: 0,
            }}
          >
            {isOpen ? <MinusSquare /> : <PlusSquare />}
          </button>
        )}
        <Checkbox
          checked={selectedIds.some((item) => item === id)}
          onChange={(event) =>
            getOnChange(event.currentTarget.checked, rootTree)
          }
          onClick={(e) => e.stopPropagation()}
        />
        {/* <ApexCheckbox2
          checked={selectedIds.some((item) => item === id)}
          onChange={(event) =>
            getOnChange(event.currentTarget.checked, rootTree)
          }
          onClick={(e) => e.stopPropagation()}
        /> */}
        <div ref={drag} style={{ opacity }}>
          {title}
        </div>
      </div>
    );
  };

  return (
    <Tree
      className={classes.rootTreeView}
      treeWalker={treeWalker}
      itemSize={30}
      height={height}
      width={400}
    >
      {ApexNode}
    </Tree>
  );
}
