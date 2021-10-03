import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import differenceBy from "lodash.differenceby";
import uniq from "lodash.uniq";
import uniqBy from "lodash.uniqby";
import zipObject from "lodash.zipobject";
import React from "react";
import { Node } from "react-flow-renderer";
import { useSelector } from "react-redux";
import { ISelectOption } from "../../Application/Components/Selects/SelectItemsType";
import { IRawRow } from "../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import LinkInputDeckAndNodes from "../Components/LinkInputDeck/LinkInputDeckAndNodes";

export interface ISelectedOthers {
  selectedOption: ISelectOption;
  others: ISelectOption[];
}

const firstOption = { value: "Select...", label: "Select..." };
const LinkInputDeck = () => {
  const [nodeType, setNodeType] = React.useState("drainagepoint");

  const { nodeElementsManual } = useSelector(
    (state: RootState) => state.networkReducer
  );

  const { selectedTableData } = useSelector(
    (state: RootState) => state.inputReducer
  );

  const uniqNodeTypes = uniqBy(
    nodeElementsManual as Node[],
    (o) => o.data.label
  )
    .map((o) => o.data.label.toLowerCase())
    .filter((l) => l !== "manifold");

  const idxNodesByNodeObj = uniqNodeTypes.reduce((acc, ntp) => {
    const uniqInputDeckNodeTitles = uniq(
      selectedTableData.map((row: IRawRow) => {
        const newKeys = Object.keys(row).map((k) => k.toLowerCase());
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
      return {
        ...acc,
        [i]: { selectedOption: firstOption, others: inputDeckNodeTitleOptions },
      };
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
    console.log(
      "Logged output --> ~ file: LinkInputDeck.tsx ~ line 83 ~ idxNodesByNodeObj ~ nodeElementsManualByNode",
      nodeElementsManualByNode
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

    return {
      ...acc,
      [ntp]: { inputDeckNodeTitleOptions, idxNodes, nodeDiffOptions, nodeRows },
    };
  }, {});

  console.log(
    "Logged output --> ~ file: LinkInputDeck.tsx ~ line 102 ~ LinkInputDeck ~ idxNodesByNodeObj",
    idxNodesByNodeObj
  );
  const [idxNodesObj, setIdxNodesObj] = React.useState(idxNodesByNodeObj);
  console.log(
    "Logged output --> ~ file: LinkInputDeck.tsx ~ line 102 ~ LinkInputDeck ~ idxNodesObj",
    idxNodesObj
  );

  const linkInputDeckNodesObj = uniqNodeTypes.reduce((acc, ntyp) => {
    const nytpLowerCase = ntyp.toLowerCase();

    return {
      ...acc,
      [nytpLowerCase]: (
        <LinkInputDeckAndNodes
          deckNodeTitle={nytpLowerCase}
          idxNodesObj={idxNodesObj}
          setIdxNodesObj={setIdxNodesObj}
        />
      ),
    };
  }, {});

  return (
    <>
      <ToggleButtonGroup
        size="small"
        value={nodeType}
        exclusive
        onChange={(_, currentNode: string) => setNodeType(currentNode)}
      >
        {uniqNodeTypes.map((nodeType, i) => (
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
