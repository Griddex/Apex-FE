import { Checkbox, FormControlLabel } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import SvgIcon from "@material-ui/core/SvgIcon";
import TreeItem, { TreeItemProps } from "@material-ui/lab/TreeItem";
import TreeView from "@material-ui/lab/TreeView";
import React from "react";
import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { animated, useSpring } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import ItemTypes from "../../Visualytics/Utils/DragAndDropItemTypes";
import { getForecastResultsRequestAction } from "../Redux/Actions/ForecastActions";
import { RenderTree } from "./ForecastTreeViewTypes";

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
    borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
  },
}))((props: TreeItemProps) => {
  const { label } = props;

  const [{ isDragging }, drag] = useDrag({
    item: { label, type: ItemTypes.TABLE_COLUMNDATA },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        alert(`You dropped ${item.label} into ${dropResult.name}`);
      }
    },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  });
  const opacity = isDragging ? 0.4 : 1;

  return (
    <TreeItem
      ref={drag}
      style={{ opacity }}
      {...props}
      // TransitionComponent={TransitionComponent}
    />
  );
});

const useStyles = makeStyles((theme) => ({
  rootTreeView: {
    height: "100%",
    width: "100%",
    overflow: "auto",
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

export default function ForecastTreeView() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { forecastTree, selectedForecastChartVariable } = useSelector(
    (state: RootState) => state.forecastReducer
  );

  const updatedForecastTree = [
    { ...forecastTree?.[0], id: "5749dc74-4b81-4652-8a46-a58b6bea0157" },
    { ...forecastTree?.[1], id: "ac430726-1b97-45f6-8b09-0c2ac347cc6e" },
    { ...forecastTree?.[2], id: "3d515091-8d7e-4650-8345-9fa953a23418" },
  ];

  const scenarioTree = {
    id: "6e611ee3-4133-496b-a7cc-43cea89686bc",
    name: "Scenarios",
    children: [...(updatedForecastTree as RenderTree[])],
  };

  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const [selectedModuleNames, setSelectedModuleNames] = React.useState<
    string[]
  >([]);
  const [selectedModulePaths, setSelectedModulePaths] = React.useState<
    string[]
  >([]);

  // const initExpanded = forecastTree.map((scenarioNodes) => scenarioNodes.id);

  const getChildById = (node: RenderTree, id: string) => {
    let idArray: string[] = [];
    let nameArray: string[] = [];
    let pathArray: string[] = [];

    const getAllChildren = (nodes: RenderTree | null) => {
      if (nodes === null) return [];

      idArray.push(nodes.id);
      nameArray.push(nodes.name);
      pathArray.push(nodes.path as string);

      if (Array.isArray(nodes.children)) {
        nodes.children.forEach((node) => {
          idArray = [...idArray, ...getAllChildren(node)[0]];
          idArray = idArray.filter((v, i) => idArray.indexOf(v) === i);

          nameArray = [...nameArray, ...getAllChildren(node)[1]];
          nameArray = nameArray.filter((v, i) => nameArray.indexOf(v) === i);

          pathArray = [...pathArray, ...getAllChildren(node)[1]];
          pathArray = pathArray.filter((v, i) => pathArray.indexOf(v) === i);
        });
      }

      return [idArray, nameArray, pathArray];
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
      scenarioTree,
      scenarioNodes.id
    )[0];

    const allNameNodes: string[] = getChildById(
      scenarioTree,
      scenarioNodes.id
    )[1];

    const allPathNodes: string[] = getChildById(
      scenarioTree,
      scenarioNodes.id
    )[2];

    let idArray = checked
      ? [...selectedIds, ...allIdNodes]
      : selectedIds.filter((value) => !allIdNodes.includes(value));
    idArray = idArray.filter((v, i) => idArray.indexOf(v) === i);
    setSelectedIds(idArray);

    let nameArray = checked
      ? [...selectedModuleNames, ...allNameNodes]
      : selectedModuleNames.filter((value) => !allNameNodes.includes(value));
    nameArray = nameArray.filter((v, i) => nameArray.indexOf(v) === i);
    setSelectedModuleNames(nameArray);

    let pathArray = checked
      ? [...selectedModulePaths, ...allPathNodes]
      : selectedModulePaths.filter((value) => !allPathNodes.includes(value));
    pathArray = pathArray.filter((v, i) => pathArray.indexOf(v) === i);
    setSelectedModulePaths(pathArray);
  };

  const renderTree = (scenarioNodes: RenderTree) => {
    return (
      <StyledTreeItem
        key={scenarioNodes.id}
        nodeId={scenarioNodes.id}
        label={
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedIds.some((item) => item === scenarioNodes.id)}
                onChange={(event) =>
                  getOnChange(event.currentTarget.checked, scenarioNodes)
                }
                onClick={(e) => e.stopPropagation()}
              />
            }
            label={<>{scenarioNodes.name}</>}
            key={scenarioNodes.id}
          />
        }
      >
        {Array.isArray(scenarioNodes.children)
          ? scenarioNodes.children.map((node) => renderTree(node))
          : null}
      </StyledTreeItem>
    );
  };

  React.useEffect(() => {
    // const {selectedModuleIds} = useSelector((state:RootState) => state.forecastReducer)
    console.log(
      "Logged output --> ~ file: ForecastTreeView.tsx ~ line 282 ~ React.useEffect ~ selectedModulePaths",
      selectedModulePaths
    );

    if (selectedIds.length > 0) {
      dispatch(
        getForecastResultsRequestAction(
          selectedIds,
          selectedModuleNames,
          selectedModulePaths,
          selectedForecastChartVariable
        )
      );
    }
  }, [selectedIds, selectedForecastChartVariable]);

  return (
    <TreeView
      className={classes.rootTreeView}
      // defaultExpanded={initExpanded}
      defaultCollapseIcon={<MinusSquare />}
      defaultExpandIcon={<PlusSquare />}
      // defaultEndIcon={<CloseSquare />}
    >
      {renderTree(scenarioTree)}
    </TreeView>
  );
}
