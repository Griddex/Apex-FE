import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Image from "../../../Application/Components/Visuals/Image";
import { IAuthor } from "./AuthorTypes";

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

const Author = ({ author }: { author: IAuthor }) => {
  const classes = useStyles();

  return (
    <div className={classes.author}>
      <Image className={classes.image} src={author.avatarUrl} />
      <Typography className={classes.name}>{author.name}</Typography>
    </div>
  );
};

export default Author;
