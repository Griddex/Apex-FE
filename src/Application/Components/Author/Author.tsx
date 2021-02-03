import { Avatar, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Image from "../../../Application/Components/Visuals/Image";
import { IAuthor } from "./AuthorTypes";
import getFirstCharFromEveryWord from "./../../Utils/GetFirstCharFromEveryWord";

const useStyles = makeStyles(() => ({
  image: { height: 30, width: 30 },
  author: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flexGrow: 1,
    height: 35,
  },
  name: { marginLeft: 15 },
}));

const authorCheck = (variableToCheck: any): variableToCheck is IAuthor =>
  (variableToCheck as IAuthor).name !== undefined;

const Author = ({ author }: { author: IAuthor | string }) => {
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
