import { useTheme } from "@mui/material";
import React from "react";
import { Column } from "react-data-griddex";
import { Node } from "react-flow-renderer";
import { useDispatch } from "react-redux";
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
import { ITableButtonsProps } from "../../../Application/Components/Table/TableButtonsTypes";
import { TUseState } from "../../../Application/Types/ApplicationTypes";
import { nodeImages } from "../../Services/NodesImageService";
import { TNodeTypes } from "../Widgets/WidgetTypes";

export interface ISelectedOthers {
  selectedOption: ISelectOption;
  others: ISelectOption[];
}

export type TIdxNodesObj = Record<
  string,
  {
    inputDeckNodeTitleOptions: ISelectOption[];
    idxNodes: Record<number, ISelectedOthers>;
    nodeDiffOptions: ISelectOption[];

    nodeRows: {
      sn: number;
      nodeImage: any;
      applicationNode: any;
      inputDeckNode: string;
    }[];
  }
>;

export interface ILinkInputDeckAndNodes {
  deckNodeTitle: string;
  idxNodesObj: TIdxNodesObj;
  setIdxNodesObj: TUseState<TIdxNodesObj>;
}

const LinkInputDeckAndNodes = ({
  deckNodeTitle,
  idxNodesObj,
  setIdxNodesObj,
}: ILinkInputDeckAndNodes) => {
  console.log(
    "Logged output --> ~ file: LinkInputDeckAndNodes.tsx ~ line 50 ~ idxNodesObj",
    idxNodesObj
  );
  const dispatch = useDispatch();
  const theme = useTheme();

  const linkRef = React.useRef<HTMLDivElement>(null);
  const { nodeDiffOptions, nodeRows } = idxNodesObj[deckNodeTitle];
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
        name: "IMAGE",
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
          const options = stnDiffOptions;

          return (
            <ApexSelectRS
              valueOption={valueOption}
              data={options as ISelectOption[]}
              handleSelect={(option: OnChangeValue<ISelectOption, false>) => {
                const optionDefined = option as ISelectOption;

                setIdxNodesObj((prev) => {
                  const currentRowIdxNodes = prev[deckNodeTitle]["idxNodes"];

                  const newRowIdxNodes = Object.keys(currentRowIdxNodes).reduce(
                    (acc: Record<number, ISelectedOthers>, key) => {
                      const keyDefined = parseInt(key);
                      const optionCategories = currentRowIdxNodes[keyDefined];

                      return {
                        ...acc,
                        [keyDefined]: {
                          selectedOption:
                            keyDefined === i
                              ? (option as ISelectOption)
                              : optionCategories.selectedOption,
                          others: stnDiffOptions,
                        },
                      };
                    },
                    {} as Record<number, ISelectedOthers>
                  );

                  prev[deckNodeTitle]["idxNodes"] = newRowIdxNodes;
                  console.log(
                    "Logged output --> ~ file: LinkInputDeckAndNodes.tsx ~ line 133 ~ setIdxNodesObj ~ prev",
                    prev
                  );

                  return prev;
                });

                const selectedRow = rows[i];
                rows[i] = {
                  ...selectedRow,
                  inputDeckNode: optionDefined.label,
                };

                setRows(rows);
              }}
              menuPortalTarget={linkRef.current as HTMLDivElement}
              isSelectOptionType={true}
              containerHeight={40}
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

          if (inputDeckNode === "Select...") {
            return (
              <ApexFlexContainer>
                <div
                  style={{
                    width: 24,
                    height: 24,
                    backgroundColor: theme.palette.secondary.main,
                  }}
                />
              </ApexFlexContainer>
            );
          } else {
            return (
              <ApexFlexContainer>
                <div
                  style={{
                    width: 24,
                    height: 24,
                    backgroundColor: theme.palette.success.main,
                  }}
                />
              </ApexFlexContainer>
            );
          }
        },
        width: 30,
      },
    ];

    return columns;
  };

  const columns = React.useMemo(
    () => generateColumns(nodeDiffOptions),
    [nodeDiffOptions]
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

export default LinkInputDeckAndNodes;
