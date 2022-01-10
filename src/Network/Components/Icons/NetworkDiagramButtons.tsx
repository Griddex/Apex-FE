import { IconButton, Tooltip, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import ViewAgendaOutlinedIcon from "@mui/icons-material/ViewAgendaOutlined";
import React from "react";
import ChartButtons from "../../../Visualytics/Components/Menus/ChartButtons";
import ForecastButtonsMenu from "../Menus/ForecastButtonsMenu";
import NetworkButtonsMenu from "../Menus/NetworkButtonsMenu";
import { INetworkDiagramIcons } from "./NetworkDiagramIconsTypes";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { toggleElementTitlesAction } from "../../Redux/Actions/NetworkActions";

const useStyles = makeStyles(() => ({
  networkContentIcons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    borderBottom: "1px solid #E7E7E7",
    height: 28,
    "& > *:not(:first-child)": {
      marginLeft: 5,
    },
  },
}));

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);
const showTitleSelector = createDeepEqualSelector(
  (state: RootState) => state.networkReducer.showTitle,
  (showTitle) => showTitle
);

const NetworkDiagramButtons = (props: INetworkDiagramIcons) => {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    showMiniMap,
    setShowMiniMap,
    showControls,
    setShowControls,
    componentRef,
  } = props;

  const showTitle = useSelector(showTitleSelector);

  return (
    <div className={classes.networkContentIcons}>
      <NetworkButtonsMenu />
      <ForecastButtonsMenu />
      <Tooltip
        key={"miniMapToolTip"}
        title={"Minimap"}
        placement="bottom-end"
        arrow
      >
        <IconButton
          style={{
            height: "28px",
            backgroundColor: theme.palette.primary.light,
            border: `1px solid ${theme.palette.primary.main}`,
            borderRadius: 2,
          }}
          onClick={() => setShowMiniMap(!showMiniMap)}
          size="large"
        >
          <MapOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip
        key={"controlsToolTip"}
        title={"Controls"}
        placement="bottom-end"
        arrow
      >
        <IconButton
          style={{
            height: "28px",
            backgroundColor: theme.palette.primary.light,
            border: `1px solid ${theme.palette.primary.main}`,
            borderRadius: 2,
          }}
          onClick={() => setShowControls(!showControls)}
          size="large"
        >
          <ViewAgendaOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip
        key={"labelsToolTip"}
        title={"Labels"}
        placement="bottom-end"
        arrow
      >
        <IconButton
          style={{
            height: "28px",
            backgroundColor: theme.palette.primary.light,
            border: `1px solid ${theme.palette.primary.main}`,
            borderRadius: 2,
          }}
          onClick={() => dispatch(toggleElementTitlesAction(!showTitle))}
          size="large"
        >
          <LabelOutlinedIcon />
        </IconButton>
      </Tooltip>
      <ChartButtons
        showExtraButtons={false}
        componentRef={componentRef as React.MutableRefObject<any>}
      />
    </div>
  );
};

export default NetworkDiagramButtons;
