import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import history from "./../../Application/Services/HistoryService";
import { loadWorkflowAction } from "./../../Application/Redux/Actions/UILayoutActions";
import { useDispatch } from "react-redux";

const cardWidth = 300;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    textAlign: "center",
    flexDirection: "column",
    maxWidth: cardWidth,
    minWidth: cardWidth * 0.8,
    minHeight: cardWidth * 1.1,
    maxHeight: cardWidth * 1.5,
  },

  cardBoxHeader: {
    paddingTop: "10%",
    minHeight: "100%",
    cursor: "pointer ",
    "&:hover": {
      borderColor: theme.palette.primary.light,
    },
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
  const { MainTitle, Description, Icon, UrlPath } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Card className={classes.root}>
      <Box
        className={classes.cardBoxHeader}
        onClick={() => {
          dispatch(loadWorkflowAction());
          history.push(UrlPath);
        }}
      >
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
      {/* <CardActions className={classes.cardActions}>
        <Button
          className={classes.button}
          size="large"
          variant="contained"
          onClick={() => {
            dispatch(loadWorkflowAction());
            history.push(UrlPath);
          }}
        >
          Select
        </Button>
      </CardActions> */}
    </Card>
  );
}
