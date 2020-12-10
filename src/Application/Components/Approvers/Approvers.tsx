import { useTheme, Typography, makeStyles } from "@material-ui/core";
import React from "react";
import Image from "../../../Application/Components/Visuals/Image";
import AvatarStack from "react-avatar-stack";
import { IPersonDetail } from "../Author/Author";

const useStyles = makeStyles(() => ({
  image: { height: 30, width: 30 },
  approvers: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
  },
}));

export interface IApprovers {
  approvers: IPersonDetail[] | string;
}

const Approvers = ({ approvers }: IApprovers) => {
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
      <Typography>{`${approvers.length} Approvers`}</Typography>
    </div>
  );
};

export default Approvers;
