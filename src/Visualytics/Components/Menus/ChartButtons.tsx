import makeStyles from '@mui/styles/makeStyles';
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import React from "react";
import IconButtonWithTooltip from "../../../Application/Components/IconButtons/IconButtonWithTooltip";
import { IChartButtonsProps } from "./ChartButtonsTypes";
import ReactToPrint from "react-to-print";
import CameraOutlinedIcon from "@mui/icons-material/CameraOutlined";

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
