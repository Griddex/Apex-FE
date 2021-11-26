import { css } from "@emotion/react";
import Backdrop from "@mui/material/Backdrop";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { useDispatch } from "react-redux";
import HashLoader from "react-spinners/HashLoader";
import ReactStopwatch from "react-stopwatch";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import { TUseState } from "../../../Application/Types/ApplicationTypes";
import { updateForecastResultsParameterAction } from "../../../Forecast/Redux/Actions/ForecastActions";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1300,
    position: "fixed",
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const override = css`
  display: block;
  margin: 0 auto;
  height: "100%";
  width: "100%";
  z-index: 1300;
  position: "fixed";
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
`;

export interface IForecastSpinner {
  pending: boolean;
  message: string;
  willDisplayTime: boolean;
  action?: TUseState<number>;
}

const ForecastSpinner = ({
  pending,
  message,
  willDisplayTime,
}: IForecastSpinner) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [clockTime, setClockTime] = React.useState(0);

  const handleClose = () => {
    dispatch(hideSpinnerAction());
  };

  React.useEffect(() => {
    dispatch(
      updateForecastResultsParameterAction("forecastDuration", clockTime)
    );
  }, [pending]);

  return (
    <Backdrop className={classes.backdrop} open={pending} onClick={handleClose}>
      <div>
        <HashLoader css={override} color={"white"} loading={pending} />
        <p>{message}</p>
        {willDisplayTime && (
          <ReactStopwatch
            seconds={0}
            minutes={0}
            hours={0}
            onChange={({ hours, minutes, seconds }: any) => {
              const secs =
                Number(hours) * 60 * 60 + Number(minutes) * 60 + seconds;

              setClockTime(secs);
            }}
            render={({ formatted, hours, minutes, seconds }: any) => {
              return (
                <div>
                  <p>Formatted: {formatted}</p>
                  <p>Hours: {hours}</p>
                  <p>Minutes: {minutes}</p>
                  <p>Seconds: {seconds}</p>
                </div>
              );
            }}
          />
        )}
      </div>
    </Backdrop>
  );
};

export default ForecastSpinner;
