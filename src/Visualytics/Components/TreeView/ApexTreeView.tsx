import { Checkbox, FormControlLabel } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import { alpha, makeStyles, withStyles } from "@material-ui/core/styles";
import SvgIcon from "@material-ui/core/SvgIcon";
import TreeItem, { TreeItemProps } from "@material-ui/lab/TreeItem";
import TreeView from "@material-ui/lab/TreeView";
import React from "react";
import { useDrag } from "react-dnd";
import { animated, useSpring } from "react-spring"; // web.cjs is required for IE 11 support
import { IApexTreeView, RenderTree } from "./ApexTreeViewTypes";

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

function CloseSquare(props: any) {
  return (
    <SvgIcon
      className="close"
      fontSize="inherit"
      style={{ width: 14, height: 14 }}
      {...props}
    >
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}

function TransitionComponent(props: { in?: boolean }) {
  const style = useSpring({
    from: { opacity: 0, transform: "translate3d(20px,0,0)" },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

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
  return <TreeItem {...props} /*TransitionComponent={TransitionComponent}*/ />;
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
    const allIdNodes: string[] = getChildById(rootTree, scenarioNodes.id)[0];

    const allNameNodes: string[] = getChildById(rootTree, scenarioNodes.id)[1];

    const allPathNodes: string[] = getChildById(rootTree, scenarioNodes.id)[2];

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

  const renderTree = (scenarioNodes: RenderTree) => {
    const { id, name, title } = scenarioNodes;
    const [{ isDragging }, drag] = useDrag(
      () => ({
        type: dragDropTypes,
        item: { id, name, title },
        end: (item, monitor) => {
          const dropResult = monitor.getDropResult();
        },
        collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
      }),
      []
    );
    const opacity = isDragging ? 0.4 : 1;

    return (
      <StyledTreeItem
        key={scenarioNodes.id}
        nodeId={scenarioNodes.id}
        label={
          <FormControlLabel
            style={{ width: "max-content" }}
            control={
              <Checkbox
                //TODO check this box from dropresult above
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
          />
        }
        // styledItemLabel={scenarioNodes.title}
      >
        {Array.isArray(scenarioNodes.children)
          ? scenarioNodes.children.map((node) => renderTree(node))
          : null}
      </StyledTreeItem>
    );
  };

  return (
    <TreeView
      className={classes.rootTreeView}
      defaultExpanded={initExpanded}
      defaultCollapseIcon={<MinusSquare />}
      defaultExpandIcon={<PlusSquare />}
      // defaultEndIcon={<CloseSquare />}
    >
      {renderTree(rootTree)}
    </TreeView>
  );
}
