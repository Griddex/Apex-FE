import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const cardWidth = 300;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    textAlign: "center",
    flexDirection: "column",
    maxWidth: cardWidth,
  },

  cardActionArea: {
    paddingTop: "10%",
    minHeight: "70%",
  },
  cardActions: {
    "& > *": {
      display: "flex",
      alignItems: "center",
      textAlign: "center",
      width: "100vw",
    },
  },
  button: { marginTop: `${0.25 * 200}px`, maxWidth: "200px" },
}));

export default function ImportCard(props) {
  const { MainTitle, Description, Icon } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.cardActionArea}>
        {Icon()}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {MainTitle}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {Description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Button
          className={classes.button}
          size="large"
          variant="contained"
          color="primary"
        >
          Proceed
        </Button>
      </CardActions>
    </Card>
  );
}
