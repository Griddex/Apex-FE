import CardActionArea from "@mui/material/CardActionArea";
import makeStyles from '@mui/styles/makeStyles';
import Typography from "@mui/material/Typography";
import React from "react";
import { IAction } from "../../Redux/Actions/ActionTypes";
import { IStoredDataProps } from "../../Types/ApplicationTypes";
import ApexFlexContainer from "../Styles/ApexFlexContainer";
import {
  TAllWorkflowCategories,
  TAllWorkflowProcesses,
} from "../Workflows/WorkflowTypes";

const useStyles = makeStyles((theme) => ({
  cardActionArea: (props: IMiniCardProps) => {
    const { cardWidth } = props;
    const cw = cardWidth ? cardWidth : 150;

    return {
      width: cw,
      height: cw * 1.3,
      cursor: "pointer ",
      border: `1px solid ${theme.palette.primary.main}`,
      backgroundColor: theme.palette.primary.light,
    };
  },
  title: {
    display: "flex",
    justifyContent: "center",
    width: "90%",
  },
  cardIconTitle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "60%",
    width: "100%",
    padding: 0,
  },
}));

export interface IMiniCardProps {
  icon: JSX.Element;
  title: string;
  moduleAction: () => IAction | void;
  cardWidth?: number;
  wP?: TAllWorkflowProcesses | IStoredDataProps["wkPs"];
  wC?: TAllWorkflowCategories | IStoredDataProps["wkCy"];
}

const MiniCard: React.FC<IMiniCardProps> = (props) => {
  const { moduleAction, icon, title } = props;

  const classes = useStyles(props);

  return (
    <CardActionArea className={classes.cardActionArea} onClick={moduleAction}>
      <div className={classes.cardIconTitle}>
        <ApexFlexContainer width={50} height={50}>
          {icon}
        </ApexFlexContainer>
        <div className={classes.title}>
          <Typography variant="h6" align="center">
            {title}
          </Typography>
        </div>
      </div>
    </CardActionArea>
  );
};

export default MiniCard;
