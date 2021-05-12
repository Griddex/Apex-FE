import { Badge, Button, makeStyles } from "@material-ui/core";
import React from "react";
import { ButtonProps } from "../../../Application/Components/Dialogs/DialogTypes";
import CenteredStyle from "../../../Application/Components/Styles/CenteredStyle";
import noEventPropagation from "./../../../Application/Events/NoEventPropagation";

const useStyles = makeStyles(() => ({
  rootButtons: {
    "& > *": {
      marginLeft: 5,
    },
  },
}));

export interface IAggregatedButtons {
  buttonsData: ButtonProps[];
  setButtonsData: React.Dispatch<React.SetStateAction<any>>;
}

const AggregatedButtons = ({
  buttonsData,
  setButtonsData,
}: IAggregatedButtons) => {
  const classes = useStyles();

  const [showBadge, setShowBadge] = React.useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: true,
  });

  return (
    <CenteredStyle
      justifyContent="flex-start"
      width={300}
      className={classes.rootButtons}
    >
      {buttonsData.map((button, i) => (
        <Badge
          key={i}
          badgeContent={"X"}
          color="secondary"
          onClick={() =>
            setButtonsData((prev: ButtonProps[]) => {
              const splicedData = prev.splice(i + 1);

              return splicedData;
            })
          }
          invisible={showBadge[i]}
          style={{ cursor: "pointer" }}
        >
          <Button
            variant={button.variant}
            color={button.color}
            startIcon={button.startIcon}
            {...noEventPropagation(button.handleAction)}
            onMouseEnter={() =>
              setShowBadge((prev) => ({ ...prev, [i]: false }))
            }
            // onMouseLeave={() =>
            //   setShowBadge((prev) => ({ ...prev, [i]: true }))
            // }
          >
            {button.title}
          </Button>
        </Badge>
      ))}
    </CenteredStyle>
  );
};

export default AggregatedButtons;
