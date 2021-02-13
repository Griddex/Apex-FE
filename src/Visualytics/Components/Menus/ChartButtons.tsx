import { IconButton, Tooltip } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import PrintOutlinedIcon from "@material-ui/icons/PrintOutlined";
import React from "react";
import { IChartButtonsProps } from "./ChartButtonsTypes";

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
}) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.tableContentIcons}>
      {showExtraButtons && extraButtons && extraButtons()}
      <Tooltip
        key={"printToolTip"}
        title={"Print table"}
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
          onClick={() => alert("Print")}
        >
          <PrintOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip
        key={"copyToolTip"}
        title={"Copy entire table"}
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
          onClick={() => alert("Copy")}
        >
          <FileCopyOutlinedIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default ChartButtons;
