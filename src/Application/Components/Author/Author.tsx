import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Image from "../../../Application/Components/Visuals/Image";
import { IAuthor } from "./AuthorTypes";

const useStyles = makeStyles(() => ({
  image: { height: 60, width: 60 },
  author: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flexGrow: 1,
    height: 80,
  },
  name: { marginLeft: 15 },
}));

const Author = (author: IAuthor) => {
  const classes = useStyles();

  return (
    <div className={classes.author}>
      <Image className={classes.image} src={author.imgUrl} />
      <Typography className={classes.name}>{author.name}</Typography>
    </div>
  );
};

export default Author;
