import { Badge, Button, makeStyles, useTheme } from "@material-ui/core";
import React from "react";
import { ButtonProps } from "../../../Application/Components/Dialogs/DialogTypes";
import CenteredStyle from "../../../Application/Components/Styles/CenteredStyle";
import noEventPropagation from "./../../../Application/Events/NoEventPropagation";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { TDevScenarioNames } from "../../Routes/EconomicsAnalyses/EconomicsAnalysesTypes";
import { IAggregateButtonProps } from "./../../Routes/EconomicsInput/EconomicsCostsAndRevenues/EconomicsCostsAndRevenuesTypes";

const useStyles = makeStyles(() => ({
  rootButtons: ({
    marginTop,
    buttonWidth,
    buttonHeight,
  }: IAggregatedButtons) => ({
    "& > *": {
      marginLeft: 8,
      marginTop: marginTop && marginTop,
      width: buttonWidth && buttonWidth,
      height: buttonHeight && buttonHeight,
    },
  }),
}));

export interface IAggregatedButtons {
  buttonsData: IAggregateButtonProps[];
  setButtonsData: React.Dispatch<React.SetStateAction<any>>;
  moreStyles?: CSSProperties;
  marginTop?: number | string;
  buttonWidth?: number | string;
  buttonHeight?: number | string;
  developmentScenariosCompleted?: TDevScenarioNames;
}

const AggregatedButtons = ({
  buttonsData,
  setButtonsData,
  moreStyles,
  marginTop,
  buttonWidth,
  buttonHeight,
  developmentScenariosCompleted,
}: IAggregatedButtons) => {
  const classes = useStyles({
    buttonsData,
    setButtonsData,
    moreStyles,
    marginTop,
    buttonWidth,
    buttonHeight,
    developmentScenariosCompleted,
  });

  const theme = useTheme();

  const [showBadge, setShowBadge] = React.useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: true,
  });

  return (
    <CenteredStyle
      justifyContent="flex-start"
      width={"100%"}
      className={classes.rootButtons}
      moreStyles={moreStyles}
    >
      {buttonsData.map((button, i) => {
        const isDisabled = developmentScenariosCompleted?.includes(
          button.scenarioName as NonNullable<ButtonProps["name"]>
        );

        return (
          <Badge
            key={i}
            badgeContent={"X"}
            color="secondary"
            onClick={() =>
              setButtonsData((prev: ButtonProps[]) => {
                prev.splice(i, 1);
                return prev;
              })
            }
            invisible={showBadge[i]}
            style={
              isDisabled
                ? {
                    pointerEvents: "none",
                    backgroundColor: theme.palette.grey[200],
                  }
                : { cursor: "pointer" }
            }
          >
            <Button
              style={{ width: "100%", height: buttonHeight }}
              variant={button.variant}
              color={button.color}
              startIcon={button.startIcon}
              {...noEventPropagation(button.handleAction)}
              onMouseEnter={() =>
                setShowBadge((prev) => ({ ...prev, [i]: false }))
              }
              //TODO Posibility to include a settimeout here to delay
              //remove of cancel badge
              // onMouseLeave={() =>
              //   setShowBadge((prev) => ({ ...prev, [i]: true }))
              // }
            >
              {button?.title?.replace(" Development", "")}
            </Button>
          </Badge>
        );
      })}
    </CenteredStyle>
  );
};

export default AggregatedButtons;
