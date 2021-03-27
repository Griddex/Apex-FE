import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { IAction } from "../../Redux/Actions/ActionTypes";
import { workflowSetMenuAction } from "../../Redux/Actions/ApplicationActions";
import { showContextDrawerAction } from "../../Redux/Actions/LayoutActions";
import { setWorkflowProcessAction } from "../../Redux/Actions/WorkflowActions";
import { IExistingDataProps } from "../../Types/ApplicationTypes";
import { IAllWorkflowProcesses } from "../Workflows/WorkflowTypes";

const useStyles = makeStyles((theme) => ({
  root: (props: IModuleCardProps) => {
    const { cardWidth } = props;
    const cw = cardWidth ? cardWidth : 250;

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
  name: {
    width: "100%",
    fontSize: 18,
  },
  cardIconTitle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    height: "60%",
    width: "100%",
    padding: 0,
  },
  cardDescription: {
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

interface IModuleCardProps {
  icon: JSX.Element;
  name: string;
  description: string;
  route: string;
  isDispatched?: boolean;
  moduleAction: () => IAction | void;
  cardWidth?: number;
  wP: IAllWorkflowProcesses["wrkflwPrcss"] | IExistingDataProps["wkPs"];
  wC: IAllWorkflowProcesses["wrkflwCtgry"] | IExistingDataProps["wkCy"];
}

const ModuleCard: React.FC<IModuleCardProps> = (props) => {
  const {
    isDispatched,
    moduleAction,
    icon,
    name,
    description,
    route,
    wP,
    wC,
  } = props;

  const classes = useStyles(props);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <Card className={classes.root}>
      <CardActionArea
        className={classes.cardActionArea}
        onClick={() => {
          dispatch(setWorkflowProcessAction(wP, wC));
          dispatch(workflowSetMenuAction(name));

          if (isDispatched) dispatch(moduleAction());
          else moduleAction();

          dispatch(showContextDrawerAction());
          history.push(route);
        }}
      >
        <div className={classes.cardIconTitle}>
          {icon}
          <Typography
            className={classes.name}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {name}
          </Typography>
        </div>
        <div className={classes.cardDescription}>
          <Typography
            className={classes.cardText}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {description}
          </Typography>
        </div>
      </CardActionArea>
    </Card>
  );
};

export default ModuleCard;
