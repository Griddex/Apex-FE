import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { workflowSetMenuAction } from "../Redux/Actions/ApplicationActions";
import { contextDrawerShowAction } from "../Redux/Actions/LayoutActions";

const cardWidth = 250;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    width: cardWidth,
    height: cardWidth * 1.3,
  },
  cardActionArea: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    height: "60%",
    width: "100%",
    cursor: "pointer ",
  },
  name: {
    width: "100%",
    fontSize: 18,
  },
  cardContent: {
    height: "40%",
    width: "100%",
    padding: 0,
    backgroundColor: "#F7F7F7",
  },
  cardDescription: {
    width: "80%",
    margin: "auto",
    marginTop: "5%",
    paddingLeft: 7,
    borderStyle: "solid",
    borderColor: theme.palette.primary.main,
    borderLeftWidth: 2,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    textAlign: "left",
  },
}));

export default function ModuleCard(props) {
  const { moduleAction, Icon, name, description, route } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <Card className={classes.root}>
      <CardActionArea
        className={classes.cardActionArea}
        onClick={() => {
          dispatch(workflowSetMenuAction(name));
          dispatch(moduleAction());
          dispatch(contextDrawerShowAction());
          history.push(route);
        }}
      >
        {Icon}
        <Typography
          className={classes.name}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {name}
        </Typography>
      </CardActionArea>
      <CardContent className={classes.cardContent}>
        <Typography
          className={classes.cardDescription}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
