import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import history from "./../../Application/Services/HistoryService";
import { useDispatch, useSelector } from "react-redux";
import { navigateToWorkflowAction } from "../../Application/Redux/Actions/UILayoutActions";
import { setStepperStepsAndActiveStep } from "../Redux/Actions/SetStepperActions";

const cardWidth = 300;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    textAlign: "center",
    flexDirection: "column",
    maxWidth: cardWidth,
    maxHeight: cardWidth * 1.5,
  },

  cardBoxHeader: {
    paddingTop: "10%",
    minHeight: "85%",
  },
  cardActions: {
    height: "15%",
    width: "100%",
    padding: 0,
    "& > *": {
      display: "flex",
      alignItems: "center",
      textAlign: "center",
      width: "100vw",
    },
  },
  // button: { marginTop: `${0.25 * 200}px`, maxWidth: "200px" },
  button: { height: "100%", width: "100%", padding: 0, borderRadius: 0 },
}));

export default function ImportCard(props) {
  const {
    MainTitle,
    Description,
    Icon,
    UrlPath,
    ContextAction,
    ContextTrigger,
  } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  let steps = useSelector((state) => state.ImportReducer.Steps);
  const activeStep = useSelector((state) => state.ImportReducer.ActiveStep);

  return (
    <Card className={classes.root}>
      <Box className={classes.cardBoxHeader}>
        {Icon()}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {MainTitle}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {Description}
          </Typography>
        </CardContent>
      </Box>
      <CardActions className={classes.cardActions}>
        <Button
          className={classes.button}
          size="large"
          variant="contained"
          onClick={() => {
            dispatch(navigateToWorkflowAction());
            dispatch(ContextAction(ContextTrigger));
            dispatch(
              setStepperStepsAndActiveStep(
                (steps = [
                  "Import Excel Drag and Drop",
                  "Import Excel Preview",
                  "Import Excel Match",
                ]),
                activeStep
              )
            );
            history.push(UrlPath);
          }}
        >
          Select
        </Button>
      </CardActions>
    </Card>
  );
}
