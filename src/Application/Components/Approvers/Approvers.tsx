import { useTheme, Typography, makeStyles } from "@material-ui/core";
import React from "react";
import Image from "../../../Application/Components/Visuals/Image";
import AvatarStack from "react-avatar-stack";
import { IApprovers } from "./ApproversTypes";

const useStyles = makeStyles(() => ({
  image: { height: 60, width: 60 },
  approvers: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flexGrow: 1,
    height: 80,
  },
  noOfApprovers: { marginLeft: 15 },
}));

const Approvers = ({ approvers }: { approvers: IApprovers }) => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <div className={classes.approvers}>
      <AvatarStack
        nextOverlapPrevious={true}
        maxAvatarNumber={3}
        numberLeftBackgroundColor={theme.palette.primary.main}
        numberLeftColor={"white"}
      >
        {typeof approvers === "string"
          ? "None"
          : approvers.map((approver, i) => {
              return (
                <Image
                  key={i}
                  className={classes.image}
                  src={approver.imgUrl}
                  alt={`Approver ${i}`}
                />
              );
            })}
      </AvatarStack>
      <Typography
        className={classes.noOfApprovers}
      >{`${approvers.length} Approvers`}</Typography>
    </div>
  );
};

export default Approvers;
