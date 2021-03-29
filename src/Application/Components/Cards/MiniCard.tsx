import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { IAction } from "../../Redux/Actions/ActionTypes";
import { IExistingDataProps } from "../../Types/ApplicationTypes";
import { IAllWorkflowProcesses } from "../Workflows/WorkflowTypes";

const useStyles = makeStyles((theme) => ({
  root: (props: IMiniCardProps) => {
    const { cardWidth } = props;
    const cw = cardWidth ? cardWidth : 150;

    return {
      width: cw,
      height: cw * 1.3,
    };
  },
  cardActionArea: {
    height: "100%",
    width: "100%",
    cursor: "pointer ",
  },
  title: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
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
  cardDescription: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "40%",
    width: "100%",
    padding: 0,
    backgroundColor: "#F7F7F7",
  },
  cardText: {
    width: "80%",
    margin: "auto",
    marginTop: "5%",
    paddingLeft: 0,
    borderStyle: "solid",
    borderColor: theme.palette.primary.main,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    textAlign: "left",
  },
}));

export interface IMiniCardProps {
  icon: JSX.Element;
  title: string;
  moduleAction: () => IAction | void;
  cardWidth?: number;
  wP?: IAllWorkflowProcesses["wrkflwPrcss"] | IExistingDataProps["wkPs"];
  wC?: IAllWorkflowProcesses["wrkflwCtgry"] | IExistingDataProps["wkCy"];
}

const MiniCard: React.FC<IMiniCardProps> = (props) => {
  const { moduleAction, icon, title } = props;

  const classes = useStyles(props);

  return (
    <Card className={classes.root}>
      <CardActionArea
        className={classes.cardActionArea}
        onClick={() => {
          moduleAction();
        }}
      >
        <div className={classes.cardIconTitle}>
          {icon}
          <div className={classes.title}>
            <Typography variant="h6">{title}</Typography>
          </div>
        </div>
      </CardActionArea>
    </Card>
  );
};

export default MiniCard;
