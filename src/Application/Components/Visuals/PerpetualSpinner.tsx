import { css } from "@emotion/core";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useDispatch } from "react-redux";
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

const PerpetualSpinner = ({ message }: { message: string }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(hideSpinnerAction());
  };

  return (
    <Backdrop className={classes.backdrop} open={true} onClick={handleClose}>
      <div>
        <HashLoader css={override} color={"white"} loading={true} />
        <p>{message}</p>
      </div>
    </Backdrop>
  );
};

export default PerpetualSpinner;
