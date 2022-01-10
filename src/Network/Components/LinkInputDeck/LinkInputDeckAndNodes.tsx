import { useTheme } from "@mui/material";
import React from "react";
import { Column } from "react-data-griddex";
import { OnChangeValue } from "react-select";
import { SizeMe } from "react-sizeme";
import ApexSelectRS from "../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import ApexGrid from "../../../Application/Components/Table/ReactDataGrid/ApexGrid";
import {
  IRawRow,
  ISize,
} from "../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { TUseState } from "../../../Application/Types/ApplicationTypes";
import { nodeImages } from "../../Services/NodesImageService";
import { TNodeTypes } from "../Widgets/WidgetTypes";

export interface ISelectedOthers {
  selectedOption: ISelectOption;
  others: ISelectOption[];
}

export type TNodeRows = {
  sn: number;
  nodeImage: any;
  applicationNode: any;
  inputDeckNode: string;
}[];

export type TIdxNodesObj = {
  inputDeckNodeTitleOptions: ISelectOption[];
  idxNodes: Record<number, ISelectedOthers>;
  nodeDiffOptions: ISelectOption[];
  nodeRows: TNodeRows;
};

export type TIdxNodesByNodeObj = Record<string, TIdxNodesObj>;

export interface ILinkInputDeckAndNodes {
  deckNodeTitle: string;
  idxNodesByNodeObj: TIdxNodesByNodeObj;
  setIdxNodesByNodeObj: TUseState<TIdxNodesByNodeObj>;
}

const LinkInputDeckAndNodes = ({
  deckNodeTitle,
  idxNodesByNodeObj,
  setIdxNodesByNodeObj,
}: ILinkInputDeckAndNodes) => {
  const theme = useTheme();
  const linkRef = React.useRef<HTMLDivElement>(null);

  const { nodeDiffOptions, nodeRows } = idxNodesByNodeObj[deckNodeTitle];

  const [rows, setRows] = React.useState(nodeRows);

  const generateColumns = (stnDiffOptions: ISelectOption[]) => {
    const columns: Column<IRawRow>[] = [
      {
        key: "sn",
        name: "SN",
        resizable: true,
        width: 70,
      },
      {
        key: "nodeImage",
        name: "WIDGET",
        resizable: true,
        formatter: ({ row }) => {
          const nodeImage = row.nodeImage as TNodeTypes;
          return <ApexFlexContainer>{nodeImages[nodeImage]}</ApexFlexContainer>;
        },
        width: 70,
      },
      {
        key: "applicationNode",
        name: "APPLICATION NODE",
        resizable: true,
      },
      {
        key: "inputDeckNode",
        name: `${deckNodeTitle.toUpperCase()} NODE`,
        resizable: true,
        formatter: ({ row }) => {
          const inputDeckNode = row.inputDeckNode as string;
          const sn = row.sn as number;
          const i = sn - 1;

          const valueOption = {
            value: inputDeckNode,
            label: inputDeckNode,
          };

          return (
            <ApexSelectRS
              valueOption={valueOption}
              data={stnDiffOptions as ISelectOption[]}
              handleSelect={(option: OnChangeValue<ISelectOption, false>) => {
                const optionDefined = option as ISelectOption;

                setIdxNodesByNodeObj((prev) => {
                  const currentRowIdxNodes = prev[deckNodeTitle]["idxNodes"];

                  const newRowIdxNodes = Object.keys(currentRowIdxNodes).reduce(
                    (acc: Record<number, ISelectedOthers>, key) => {
                      const keyDefined = parseInt(key);
                      const optionCategories = currentRowIdxNodes[keyDefined];
                      const sldOption =
                        keyDefined === i
                          ? (option as ISelectOption)
                          : optionCategories.selectedOption;

                      acc[keyDefined] = {
                        selectedOption: sldOption,
                        others: stnDiffOptions,
                      };

                      return acc;
                    },
                    {} as Record<number, ISelectedOthers>
                  );
                  prev[deckNodeTitle]["idxNodes"] = newRowIdxNodes;

                  const currentRows = prev[deckNodeTitle]["nodeRows"];
                  const selectedRow = currentRows[i];
                  currentRows[i] = {
                    ...selectedRow,
                    inputDeckNode: optionDefined.label,
                  };

                  prev[deckNodeTitle]["nodeRows"] = currentRows;

                  return prev;
                });

                setRows((prev) => {
                  const currentRows = prev;
                  const selectedRow = currentRows[i];
                  currentRows[i] = {
                    ...selectedRow,
                    inputDeckNode: optionDefined.label,
                  };

                  return currentRows;
                });
              }}
              menuPortalTarget={linkRef.current as HTMLDivElement}
              isSelectOptionType={true}
            />
          );
        },
      },
      {
        key: "nodeAssigned",
        name: "ASSIGNED",
        resizable: true,
        formatter: ({ row }) => {
          const inputDeckNode = row.inputDeckNode as string;
          const themeColor =
            inputDeckNode === "Select..."
              ? theme.palette.secondary.main
              : theme.palette.success.main;

          return (
            <ApexFlexContainer>
              <div
                style={{
                  width: 24,
                  height: 24,
                  backgroundColor: themeColor,
                }}
              />
            </ApexFlexContainer>
          );
        },
        width: 30,
      },
    ];

    return columns;
  };

  const rowsIsChanged = rows.map((row) => row["inputDeckNode"]).join();
  const columns = React.useMemo(
    () => generateColumns(nodeDiffOptions),
    [deckNodeTitle, rowsIsChanged]
  );

  React.useEffect(() => {
    setRows(nodeRows);
  }, [deckNodeTitle]);

  const getApexGridProps = (size: ISize) => ({
    columns: columns,
    rows: rows,
    newTableRowHeight: 35,
    onRowsChange: setRows,
    size: size,
    autoAdjustTableDim: true,
  });

  return (
    <div ref={linkRef} style={{ width: "100%", height: "100%" }}>
      <SizeMe monitorHeight refreshRate={32}>
        {({ size }) => <ApexGrid apexGridProps={getApexGridProps(size)} />}
      </SizeMe>
    </div>
  );
};

export default React.memo(LinkInputDeckAndNodes);
