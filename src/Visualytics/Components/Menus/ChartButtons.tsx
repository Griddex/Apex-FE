import { makeStyles } from "@material-ui/core/styles";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import PrintOutlinedIcon from "@material-ui/icons/PrintOutlined";
import React from "react";
import IconButtonWithTooltip from "../../../Application/Components/IconButtons/IconButtonWithTooltip";
import { IChartButtonsProps } from "./ChartButtonsTypes";
import ReactToPrint from "react-to-print";
import CameraOutlinedIcon from "@material-ui/icons/CameraOutlined";

const useStyles = makeStyles((theme) => ({
  tableContentIcons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    borderBottom: "1px solid #E7E7E7",
    height: 28,
    "& > *": {
      marginLeft: 5,
    },
  },
}));

const ChartButtons: React.FC<IChartButtonsProps> = ({
  showExtraButtons,
  extraButtons,
  componentRef,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.tableContentIcons}>
      {showExtraButtons && extraButtons && extraButtons()}
      <IconButtonWithTooltip
        toolTipKey="printToolTip"
        toolTipTitle="Print"
        toolTipPlacement="bottom-end"
        icon={() => (
          <ReactToPrint
            trigger={() => <PrintOutlinedIcon />}
            content={() => componentRef && componentRef.current}
          />
        )}
      />
      <IconButtonWithTooltip
        toolTipKey="copyToolTip"
        toolTipTitle="Snapshot"
        toolTipPlacement="bottom-end"
        icon={() => <CameraOutlinedIcon />}
      />
    </div>
  );
};

export default ChartButtons;
