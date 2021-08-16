import { Avatar, makeStyles, Typography, useTheme } from "@material-ui/core";
import capitalize from "lodash.capitalize";
import React from "react";
import AvatarStack from "react-avatar-stack";
import Image from "../../../Application/Components/Visuals/Image";
import { numberToWords } from "./../../Utils/NumberToWords";
import { IApprover } from "./ApproversTypes";

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

const approversCheck = (variableToCheck: any): variableToCheck is IApprover[] =>
  (variableToCheck as IApprover[])[0].name !== undefined;

const Approvers = ({
  approvers,
}: {
  approvers: IApprover[] | string | undefined;
}) => {
  const theme = useTheme();
  const classes = useStyles();
  const isApprovers = approversCheck(approvers);

  const getApprovers = () => {
    if (isApprovers) {
      const apprvrs = approvers as IApprover[];
      const noOfApprovers = apprvrs.length;
      const words = numberToWords(noOfApprovers);
      const noOfApproversInWords = capitalize(words);

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

              if (avatarUrl) {
                return (
                  <Image
                    key={i}
                    className={classes.image}
                    src={avatarUrl}
                    alt={`Approver ${i}`}
                  />
                );
              } else {
                return (
                  <div key={i} className={classes.approvers}>
                    <Avatar className={classes.image}>{"N"}</Avatar>
                    <Typography className={classes.noOfApprovers}>
                      {"None"}
                    </Typography>
                  </div>
                );
              }
            })}
          </AvatarStack>
          {apprvrs[0].name !== "" && (
            <Typography
              className={classes.noOfApprovers}
            >{`${noOfApproversInWords} (${noOfApprovers}) Approvers`}</Typography>
          )}
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
