import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import differenceBy from "lodash.differenceby";
import uniq from "lodash.uniq";
import uniqBy from "lodash.uniqby";
import zipObject from "lodash.zipobject";
import React from "react";
import isEqual from "react-fast-compare";
import { Node } from "react-flow-renderer";
import { useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import { ISelectOption } from "../../Application/Components/Selects/SelectItemsType";
import { IRawRow } from "../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import LinkInputDeckAndNodes from "../Components/LinkInputDeck/LinkInputDeckAndNodes";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

export interface ISelectedOthers {
  selectedOption: ISelectOption;
  others: ISelectOption[];
}

const firstOption = { value: "Select...", label: "Select..." };

const nodeElementsManualSelector = createDeepEqualSelector(
  (state: RootState) => state.networkReducer.nodeElementsManual,
  (data) => data
);

const selectedTableDataSelector = createDeepEqualSelector(
  (state: RootState) => state.inputReducer.selectedTableData,
  (data) => data
);

const LinkInputDeck = () => {
  const [nodeType, setNodeType] = React.useState("drainagepoint");

  const nodeElementsManual = useSelector(nodeElementsManualSelector);
  const selectedTableData = useSelector(selectedTableDataSelector);

  const uniqNodeTypes = React.useRef(
    uniqBy(nodeElementsManual as Node[], (o) => o.data.label)
      .map((o) => o.data.label.toLowerCase())
      .filter((l) => l !== "manifold")
  );

  const tableKeys = Object.keys(selectedTableData[0]);
  const idxNodesByNodeObj = React.useRef(
    uniqNodeTypes.current.reduce((acc, ntp) => {
      const uniqInputDeckNodeTitles = uniq(
        selectedTableData.map((row: IRawRow) => {
          const newKeys = tableKeys.map((k) => k.toLowerCase());
          const newValues = Object.values(row);

          const newRow = zipObject(newKeys, newValues);

          return newRow[ntp];
        })
      ) as string[];

      const inputDeckNodeTitleOptions = [
        "Select...",
        ...uniqInputDeckNodeTitles,
      ].map((title) => ({
        value: title,
        label: title,
      }));

      const nodesOnCanvasWithNode = (nodeElementsManual as Node[]).filter(
        (node) => node.data.label.toLowerCase() === ntp
      );

      const idxNodes = nodesOnCanvasWithNode.reduce((acc, _, i) => {
        acc[i] = {
          selectedOption: firstOption,
          others: inputDeckNodeTitleOptions,
        };
        return acc;
      }, {} as Record<number, ISelectedOthers>);

      const currentlySelectedNodeOptions = Object.keys(idxNodes).map(
        (key) => idxNodes[parseInt(key)].selectedOption
      );

      const nodeDiffOptions = differenceBy(
        inputDeckNodeTitleOptions,
        currentlySelectedNodeOptions,
        (o) => o.label
      );

      const nodeElementsManualByNode = (nodeElementsManual as Node[]).filter(
        (node) => node.data.label.toLowerCase() === ntp
      );

      const nodeRows = (nodeElementsManualByNode as Node[]).map((n, i) => {
        const { label, title } = n.data;

        return {
          sn: i + 1,
          nodeImage: label,
          applicationNode: title,
          inputDeckNode: idxNodes[i].selectedOption.label,
        };
      });

      acc[ntp] = {
        inputDeckNodeTitleOptions,
        idxNodes,
        nodeDiffOptions,
        nodeRows,
      };

      return acc;
    }, {})
  );
  const [ndsByNdObj, setIdxNodesObj] = React.useState(
    idxNodesByNodeObj.current
  );

  const linkInputDeckNodesObj = uniqNodeTypes.current.reduce((acc, ntyp) => {
    const nytpLowerCase = ntyp.toLowerCase();

    acc[nytpLowerCase] = (
      <LinkInputDeckAndNodes
        deckNodeTitle={nytpLowerCase}
        idxNodesByNodeObj={ndsByNdObj}
        setIdxNodesByNodeObj={setIdxNodesObj}
      />
    );

    return acc;
  }, {});

  return (
    <>
      <ToggleButtonGroup
        size="small"
        value={nodeType}
        exclusive
        onChange={(_, currentNode: string) => setNodeType(currentNode)}
      >
        {uniqNodeTypes.current.map((nodeType, i) => (
          <ToggleButton key={i} value={nodeType}>
            {nodeType}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <div style={{ width: "100%", height: "100%" }}>
        {linkInputDeckNodesObj[nodeType]}
      </div>
    </>
  );
};

export default LinkInputDeck;
