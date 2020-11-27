import React from "react";
import Popover, { ArrowContainer } from "react-tiny-popover";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { showPopoverAction } from "../../Redux/Actions/NetworkActions";

const useStyles = makeStyles((theme) => ({
  popoverWidget: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    backgroundColor: "#F7F7F7",
    border: "1px solid #707070",
    padding: 5,
  },
}));

const TerminalPopoverWidget = React.forwardRef(({ name }, ref) => {
  const classes = useStyles();

  return (
    <div className={classes.popoverWidget} ref={ref}>
      <div>{name}</div>
      <hr />
    </div>
  );
});

const TerminalPopover = ({ children, data }) => {
  const dispatch = useDispatch();

  return (
    <Popover
      isOpen={true}
      position={["top", "right", "left", "bottom"]}
      padding={5}
      transitionDuration={0.1}
      onClickOutside={() => dispatch(showPopoverAction(false))}
      content={({ position, targetRect, popoverRect }) => (
        <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
          position={position}
          targetRect={targetRect}
          popoverRect={popoverRect}
          arrowColor={"grey"}
          arrowSize={10}
          arrowStyle={{
            opacity: 1,
          }}
        >
          <TerminalPopoverWidget name={data} />
        </ArrowContainer>
      )}
    >
      {children}
    </Popover>
  );
};

export default TerminalPopover;
