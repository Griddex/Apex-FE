import { css } from "@emotion/react";
import Backdrop from "@mui/material/Backdrop";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import HashLoader from "react-spinners/HashLoader";
import { hideSpinnerAction } from "../../Redux/Actions/UISpinnerActions";
import { RootState } from "../../Redux/Reducers/AllReducers";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";

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
  position: "fixed";
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
`;

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const uiSpinnerPartialPropsSelector = createDeepEqualSelector(
  (state: RootState) => state.uiSpinnerReducer,
  (reducer) => reducer
);

const Spinners = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { pending, message } = useSelector(uiSpinnerPartialPropsSelector);

  const handleClose = React.useCallback(() => {
    dispatch(hideSpinnerAction());
  }, []);

  return (
    <Backdrop
      className={classes.backdrop}
      open={pending}
      onClick={handleClose}
      sx={{ zIndex: 9900 }}
    >
      <div>
        <HashLoader css={override} color={"white"} loading={pending} />
        <p>{message}</p>
      </div>
    </Backdrop>
  );
};

export default Spinners;
