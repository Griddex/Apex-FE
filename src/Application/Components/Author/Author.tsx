import { Avatar, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import getFirstCharFromEveryWord from "./../../Utils/GetFirstCharFromEveryWord";
import { AuthorType, IAuthor } from "./AuthorTypes";

const useStyles = makeStyles(() => ({
  image: { height: 30, width: 30 },
  author: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: 35,
  },
  name: { marginLeft: 15 },
}));

const authorCheck = (variableToCheck: any): variableToCheck is IAuthor =>
  (variableToCheck as IAuthor).name !== undefined;

const Author = ({ author }: { author: AuthorType }) => {
  const classes = useStyles();
  const isAuthor = authorCheck(author);

  const getAuthor = () => {
    if (isAuthor) {
      const authr = author as IAuthor;

      return (
        <div className={classes.author}>
          <Avatar className={classes.image} src={authr.avatarUrl}>
            {getFirstCharFromEveryWord(authr.name)}
          </Avatar>
          <Typography className={classes.name}>{authr.name}</Typography>
        </div>
      );
    } else {
      const authr = author as string;

      return (
        <div className={classes.author}>
          <Typography className={classes.name}>{authr}</Typography>
        </div>
      );
    }
  };

  return <>{getAuthor()}</>;
};

export default Author;
