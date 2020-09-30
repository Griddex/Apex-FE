import { css } from "@emotion/core";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import HashLoader from "react-spinners/HashLoader";
import { hideSpinnerAction } from "../../Redux/Actions/UISpinnerActions";

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

const Spinners = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const pending = useSelector((state) => state.uiSpinnerReducer.pending);
  const message = useSelector((state) => state.uiSpinnerReducer.message);

  const handleClose = () => {
    dispatch(hideSpinnerAction());
  };

  return (
    <Backdrop className={classes.backdrop} open={pending} onClick={handleClose}>
      <div>
        <HashLoader
          css={override}
          height={200}
          width={200}
          color={"white"}
          loading={pending}
        />
        <p>{message}</p>
      </div>
    </Backdrop>
  );
};

export default Spinners;
