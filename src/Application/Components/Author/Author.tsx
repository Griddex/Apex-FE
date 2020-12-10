import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Image from "../../../Application/Components/Visuals/Image";

const useStyles = makeStyles(() => ({
  rootExistingData: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#FFF",
  },
  chart: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "20%",
  },
  table: {
    width: "100%",
    height: "80%",
    padding: 20,
  },
  status: {
    height: "100%",
    width: "100%",
    fontSize: 14,
  },
  image: { height: 30, width: 30 },
  author: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
  },
  approvers: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
  },
}));

export interface IPersonDetail {
  imgUrl: string;
  name: string;
}

export interface IAuthor {
  author: IPersonDetail;
}

const Author = ({ author }: IAuthor) => {
  const classes = useStyles();

  return (
    <div className={classes.author}>
      <Image className={classes.image} src={author.imgUrl} />
      <Typography>{author.name}</Typography>
    </div>
  );
};

export default Author;
