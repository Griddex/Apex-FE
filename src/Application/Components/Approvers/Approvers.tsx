import { useTheme, Typography, makeStyles } from "@material-ui/core";
import React from "react";
import Image from "../../../Application/Components/Visuals/Image";
import AvatarStack from "react-avatar-stack";
import { IApprover } from "./ApproversTypes";
import { numberToWords } from "./../../Utils/NumberToWords";
import ToTitleCase from "../../Utils/ToTitleCase";

const useStyles = makeStyles(() => ({
  image: { height: 30, width: 30 },
  approvers: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: 35,
  },
  noOfApprovers: { marginLeft: 15 },
}));

const approversCheck = (variableToCheck: any): variableToCheck is IApprover =>
  (variableToCheck as IApprover).name !== undefined;

const Approvers = ({
  approvers,
}: {
  approvers: IApprover[] | string | undefined;
}) => {
  const theme = useTheme();
  const classes = useStyles();
  const isApprover = approversCheck(approvers);

  const getApprovers = () => {
    if (isApprover) {
      const apprvrs = approvers as IApprover[];
      const noOfApprovers = apprvrs.length;
      const noOfApproversInWords = ToTitleCase(numberToWords(noOfApprovers));

      return (
        <div className={classes.approvers}>
          <AvatarStack
            nextOverlapPrevious={true}
            maxAvatarNumber={3}
            numberLeftBackgroundColor={theme.palette.primary.main}
            numberLeftColor={"white"}
          >
            {apprvrs.map((approver, i) => {
              const { avatarUrl } = approver;

              return (
                <Image
                  key={i}
                  className={classes.image}
                  src={avatarUrl ? avatarUrl : ""}
                  alt={`Approver ${i}`}
                />
              );
            })}
          </AvatarStack>
          <Typography
            className={classes.noOfApprovers}
          >{`${noOfApproversInWords} (${noOfApprovers}) Approvers`}</Typography>
        </div>
      );
    } else {
      const apprvrs = approvers as string;
      return (
        <div className={classes.approvers}>
          <Typography className={classes.noOfApprovers}>{apprvrs}</Typography>
        </div>
      );
    }
  };

  return <>{getApprovers()}</>;
};

export default Approvers;
