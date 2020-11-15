import { fade, makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import ControlCameraOutlinedIcon from "@material-ui/icons/ControlCameraOutlined";
import DeviceHubOutlinedIcon from "@material-ui/icons/DeviceHubOutlined";
import LinkOutlinedIcon from "@material-ui/icons/LinkOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import groupBy from "lodash/groupBy";
import { useSnackbar } from "notistack";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ApexTable from "../../../../Application/Components/Table/ApexTable";
import TableAction from "../../../../Application/Components/Table/TableAction";
import TableRole from "../../../../Application/Components/Table/TableRole";
import { hideSpinnerAction } from "../../../../Application/Redux/Actions/UISpinnerActions";
import generateActualTable from "../../../../Application/Utils/GenerateActualTable";
import generateTableColumnWidths from "../../../../Application/Utils/GenerateTableColumnWidths";
import generateTableWidth from "../../../../Application/Utils/GenerateTableWidth";
import regenerateTableWithActualHeaders from "../../../../Application/Utils/RegenerateTableWithActualHeaders";
import ConnectManifoldsToFlowstations from "../../../../Network/Utils/ConnectManifoldsToFlowstations";
import { persistSelectedUnitRowOptionIndicesAction } from "../../../Redux/Actions/ImportActions";
import Dialogs from "./../../../../Application/Components/Dialogs/Dialogs";
import { hideDialogAction } from "./../../../../Application/Redux/Actions/DialogsAction";
import ConnectFlowstationsToTerminal from "./../../../../Network/Utils/ConnectFlowstationsToTerminal";
import ConnectWellheadsToManifolds from "./../../../../Network/Utils/ConnectWellheadsToManifolds";
import GenerateFlowstationNodes from "./../../../../Network/Utils/GenerateFlowstationNodes";
import GenerateGasFacilityNodes from "./../../../../Network/Utils/GenerateGasFacilityNodes";
import GenerateManifoldNodes from "./../../../../Network/Utils/GenerateManifoldNodes";
import GenerateTerminalNodes from "./../../../../Network/Utils/GenerateTerminalNodes";
import GenerateWellheadNodes from "./../../../../Network/Utils/GenerateWellheadNodes";
import SplitFlowstationsGasFacilities from "./../../../../Network/Utils/SplitFlowstationsGasFacilities";
import { persistFinalTableDataAction } from "./../../../Redux/Actions/ImportActions";
import { persistNetworkElementsAction } from "./../../../Redux/Actions/AutomaticNetworkActions";

const useStyles = makeStyles((theme) => ({
  rootPreviewSave: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#FFF",
    padding: 20,
  },
  table: {
    width: "100%",
    height: "80%",
    padding: 20,
  },
  select: {
    top: 0,
    height: 30,
    width: "100%",
    fontSize: 14,
  },
  unitClassification: {
    top: 0,
    height: 30,
    width: 170,
    fontSize: 14,
  },
  score: { fontSize: 14 },
  dialogContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "flex-end",
    height: 350,
    width: "100%",
    "& > *": {
      height: 50,
      width: "95%",
      boxShadow: `${fade("#A8A8A8", 0.25)} 0 0 0 2px`,
      border: `1px solid ${theme.palette.primary.main}`,
    },
  },
}));

export default function PreviewSave() {
  const classes = useStyles();
  const dispatch = useDispatch();

  //Actions
  const handleEditAction = (event) => {
    event.persist();
  };
  const handleDeleteAction = (event) => {
    event.persist();
  };
  const handlePickAction = (event) => {
    event.persist();
  };

  //File Headers
  const noAddedColumnstableData = useSelector(
    (state) => state.importReducer.tableData
  );

  const UnitSelect = ({ columnIndex }) => {
    const unitMatchesUnique = useSelector(
      (state) => state.importReducer.fileUnitsMatch
    );
    const fileUnits = useSelector((state) => state.importReducer.fileUnits);
    const fileUnitsUnique = useSelector(
      (state) => state.importReducer.fileUnitsUnique
    );

    const unitMatches = fileUnits.map((unit) => {
      if (unit === "") return { None: "None" };
      else {
        const unitIndex = fileUnitsUnique.indexOf(unit);
        return unitMatchesUnique[unitIndex];
      }
    });

    const selectedUnitRowIndex = useSelector(
      (state) => state.importReducer.selectedUnitRowIndex
    );

    const matches = Object.keys(unitMatches[columnIndex]);
    const [unit, setUnit] = React.useState(matches[selectedUnitRowIndex]);

    const handleSelectChange = (event) => {
      event.persist();

      const { nativeEvent } = event;
      const selectedUnit = event.target.value;

      setUnit(selectedUnit);
      const optionIndex = matches.indexOf(selectedUnit);
      dispatch(
        persistSelectedUnitRowOptionIndicesAction(columnIndex, optionIndex)
      );

      //TODO: dispatch selected unit to update unit in redux store

      nativeEvent.stopImmediatePropagation();
    };

    return (
      <Select
        key={columnIndex}
        className={classes.select}
        name={columnIndex.toString()}
        value={unit}
        onChange={handleSelectChange}
        label=""
        size="small"
      >
        {matches.map((matchName, i) => (
          <MenuItem key={i} value={matchName}>
            {matchName}
          </MenuItem>
        ))}
      </Select>
    );
  };

  //Grab indices that defines header, units and body rows
  const tableRoleIndices = useSelector(
    (state) => state.importReducer.tableRoleIndices
  );

  let headerRow = {};
  let tableRows = [];
  for (let i = 0; i < noAddedColumnstableData.length; i++) {
    const roleNumber = tableRoleIndices[i];
    switch (roleNumber) {
      case 0:
        headerRow = noAddedColumnstableData[i];
        break;
      case 2:
        tableRows.push(noAddedColumnstableData[i]);
        break;
      default:
        break;
    }
  }

  //Define headers
  const applicationHeaders = Object.values(headerRow);
  const interimHeaders = Object.keys(headerRow);

  //Define units row
  const unitSelectRow = applicationHeaders.reduce((a, _, i) => {
    return {
      ...a,
      [interimHeaders[i]]: <UnitSelect columnIndex={i} />, //what header is this?
    };
  }, {});
  const aggregateTableData = [unitSelectRow, ...tableRows];

  //Regenerate Table with actual headers
  const cleanTableData = regenerateTableWithActualHeaders(
    aggregateTableData,
    applicationHeaders
  );

  //Generate from columns data above
  const tableActions = {
    actionName: "ACTIONS",
    width: 120,
    actionComponent: () => <TableAction />,
    actionMethods: {
      handleEditAction: handleEditAction,
      handleDeleteAction: handleDeleteAction,
      handlePickAction: handlePickAction,
    },
  };
  const TableActions = [];
  const { actionComponent, actionMethods } = tableActions;
  for (let i = 0; i < cleanTableData.length; i++) {
    const action = React.cloneElement(actionComponent(), {
      i,
      ...actionMethods,
    });
    TableActions.push({ [tableActions.actionName]: action });
  }

  //Generate table roles
  const tableRoles = {
    roleName: "ROLES",
    width: 120,
    roleComponent: () => <TableRole />,
    roleNames: ["Headers", "Units", "Data", "-"],
    roleColors: ["#22BE34", "#DA1B57", "#2BB4C1", "#969498"],
  };
  const TableRoles = [];
  const { roleComponent, roleNames, roleColors } = tableRoles;
  for (let i = 0; i <= cleanTableData.length; i++) {
    const role = React.cloneElement(roleComponent(), {
      i,
      roleNames,
      roleColors,
    });
    TableRoles.push({ [tableRoles.roleName]: role });
  }

  const addedColumnHeaders = [tableActions.actionName, tableRoles.roleName];

  const { tableHeaders, tableData } = generateActualTable(
    addedColumnHeaders,
    TableActions,
    TableRoles,
    applicationHeaders,
    cleanTableData
  );

  const tableColumnWidths = generateTableColumnWidths(
    tableData,
    tableActions.width,
    tableRoles.width
  );

  const tableWidth = generateTableWidth(tableColumnWidths);

  const finalTableData = cleanTableData.slice(1, cleanTableData.length);
  React.useEffect(() => {
    dispatch(hideSpinnerAction());
    dispatch(persistFinalTableDataAction(finalTableData));
  }, [dispatch]);

  // const [isSelected, setIsSelected] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { subModuleName } = useSelector((state) => state.applicationReducer);
  const history = useHistory();

  const ManageDeckContent = () => {
    const buttonsData = [
      {
        title: "Save Deck Only",
        color: "primary",
        startIcon: <SaveOutlinedIcon />,
        handleAction: () => {
          enqueueSnackbar(`${subModuleName} saved`, {
            persist: false,
            variant: "success",
          });
        },
      },
      {
        title: "Save and Automatically Generate Network",
        color: "primary",
        startIcon: <ControlCameraOutlinedIcon />,
        handleAction: () => {
          enqueueSnackbar(`${subModuleName} saved`, {
            persist: false,
            variant: "success",
          });

          //Grouping by each Network Element
          const drainagePointsData = groupBy(
            finalTableData,
            (row) => row["Drainage Point"]
          );
          const flowStationsGasFacilitiesData = groupBy(
            finalTableData,
            (row) => row["Flow station"]
          );
          const {
            flowStationsData,
            gasFacilitiesData,
          } = SplitFlowstationsGasFacilities(flowStationsGasFacilitiesData);

          //Nodes
          const terminalNodes = GenerateTerminalNodes([
            "Forcados Yokri Terminal",
          ]);
          console.log(
            "Logged output -->: ManageDeckContent -> terminalNodes",
            terminalNodes
          );
          const flowstationNodes = GenerateFlowstationNodes(flowStationsData);
          console.log(
            "Logged output -->: ManageDeckContent -> flowstationNodes",
            flowstationNodes
          );
          const gasFacilityNodes = GenerateGasFacilityNodes(gasFacilitiesData);
          console.log(
            "Logged output -->: ManageDeckContent -> gasFacilityNodes",
            gasFacilityNodes
          );
          const manifoldNodes = GenerateManifoldNodes(
            flowstationNodes,
            gasFacilityNodes
          );
          console.log(
            "Logged output -->: ManageDeckContent -> manifoldNodes",
            manifoldNodes
          );

          const wellheadNodes = GenerateWellheadNodes(
            flowstationNodes,
            gasFacilityNodes,
            flowStationsData,
            gasFacilitiesData
          );
          const wellheadNodesMerged = [];
          for (const node of wellheadNodes) {
            wellheadNodesMerged.push(...node);
          }

          const allNodes = [
            ...terminalNodes,
            ...flowstationNodes,
            ...gasFacilityNodes,
            ...manifoldNodes,
            ...wellheadNodesMerged,
          ];
          //Edges
          const flowstationTerminalEdges = ConnectFlowstationsToTerminal(
            terminalNodes,
            flowstationNodes,
            gasFacilityNodes
          );
          const manifoldFlowstationEdges = ConnectManifoldsToFlowstations(
            manifoldNodes,
            flowstationNodes,
            gasFacilityNodes
          );
          const wellheadManifoldEdges = ConnectWellheadsToManifolds(
            wellheadNodes,
            manifoldNodes
          );

          const allEdges = [
            ...flowstationTerminalEdges,
            ...manifoldFlowstationEdges,
            ...wellheadManifoldEdges,
          ];

          const allNetworkElements = [...allNodes, ...allEdges];
          dispatch(persistNetworkElementsAction(allNetworkElements));

          history.push("/apex/network");
        },
      },
      {
        title: "Save and Manually Generate Network",
        color: "primary",
        startIcon: <DeviceHubOutlinedIcon />,
        handleAction: () => {
          enqueueSnackbar(`${subModuleName} saved`, {
            persist: false,
            variant: "success",
          });

          history.push("/apex/network");
        },
      },
      {
        title: "Save and Link Deck to Existing Network",
        color: "primary",
        startIcon: <LinkOutlinedIcon />,
        handleAction: () => {
          enqueueSnackbar(`${subModuleName} saved`, {
            persist: false,
            variant: "error",
          });
        },
      },
    ];

    return (
      <div className={classes.dialogContent}>
        {buttonsData.map((button, i) => (
          <Button
            key={i}
            variant={button.variant}
            color={button.color}
            onClick={button.handleAction}
            startIcon={button.startIcon}
          >
            {button.title}
          </Button>
          // <div>

          // </div>
        ))}
      </div>
    );
  };

  const ManageDeckDialogActions = () => {
    const buttonsData = [
      {
        title: "Cancel",
        variant: "outlined",
        color: "secondary",
        startIcon: <CloseOutlinedIcon />,
        handleAction: () => dispatch(hideDialogAction()),
      },
    ];

    return buttonsData.map((button, i) => (
      <Button
        key={i}
        variant={button.variant}
        color={button.color}
        onClick={button.handleAction}
        startIcon={button.startIcon}
      >
        {button.title}
      </Button>
    ));
  };

  return (
    <>
      <Dialogs
        content={ManageDeckContent()}
        actions={() => ManageDeckDialogActions()}
      />
      <div className={classes.rootPreviewSave}>
        <ApexTable
          tableData={tableData}
          tableHeaders={tableHeaders}
          tableColumnWidths={tableColumnWidths}
          tableWidth={tableWidth}
        />
      </div>
    </>
  );
}
