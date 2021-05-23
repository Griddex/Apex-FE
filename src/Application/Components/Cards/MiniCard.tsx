import CardActionArea from "@material-ui/core/CardActionArea";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { IAction } from "../../Redux/Actions/ActionTypes";
import { IExistingDataProps } from "../../Types/ApplicationTypes";
import ApexFlexStyle from "../Styles/ApexFlexStyle";
import { IAllWorkflows } from "../Workflows/WorkflowTypes";

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
  wP?: IAllWorkflows["wrkflwPrcss"] | IExistingDataProps["wkPs"];
  wC?: IAllWorkflows["wrkflwCtgry"] | IExistingDataProps["wkCy"];
}

const MiniCard: React.FC<IMiniCardProps> = (props) => {
  const { moduleAction, icon, title } = props;

  const classes = useStyles(props);

  return (
    <CardActionArea className={classes.cardActionArea} onClick={moduleAction}>
      <div className={classes.cardIconTitle}>
        <ApexFlexStyle width={50} height={50}>
          {icon}
        </ApexFlexStyle>
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
