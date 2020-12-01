import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useDispatch } from "react-redux";
import Popover, { ArrowContainer } from "react-tiny-popover";
import { showPopoverAction } from "./../../Redux/Actions/NetworkActions";

const useStyles = makeStyles((theme) => ({
  popoverWidget: {
    display: "flex",
    flexDirection: "column",
    height: "auto",
    width: "auto",
    backgroundColor: "#F7F7F7",
    border: "1px solid #707070",
    padding: 5,
  },
  popoverItemContainer: {
    display: "flex",
    flexDirection: "column",
  },
  popoverItem: {
    display: "flex",
    flexDirection: "row",
    height: 20,
  },
}));

const WellheadPopoverWidget = React.forwardRef(({ data }, ref) => {
  const classes = useStyles();
  const name = data[0]["Drainage Point"];

  return (
    <div className={classes.popoverWidget} ref={ref}>
      <div>Name:</div>
      <div>
        <span>&nbsp;&nbsp;</span>
        {name}
      </div>
      <div>
        {data &&
          data.map((obj, i) => {
            return (
              <div key={i} className={classes.popoverItemContainer}>
                <div className={classes.popoverItem}>
                  <div>String:</div>
                  <div>
                    <span>&nbsp;&nbsp;</span>
                    {`${obj.String}`}
                  </div>
                </div>
                <div className={classes.popoverItem}>
                  <div>Reservoir:</div>
                  <div>
                    <span>&nbsp;&nbsp;</span>
                    {`${obj.Reservoir}`}
                  </div>
                </div>
                <div className={classes.popoverItem}>
                  <div>Hydrocarbon Stream:</div>
                  <div>
                    <span>&nbsp;&nbsp;</span>
                    {`${obj["Hydrocarbon Stream"]}`}
                  </div>
                </div>
                <div className={classes.popoverItem}>
                  <div>
                    {`${
                      obj["Hydrocarbon Stream"] === "OIL"
                        ? "Initial Oil Rate"
                        : "Initial Gas Rate"
                    }`}
                  </div>
                  <div>
                    <span>&nbsp;&nbsp;</span>
                    {obj["Init. Oil/Gas Rate 2P/2C"]}
                  </div>
                </div>
                <hr />
              </div>
            );
          })}
      </div>
    </div>
  );
});

const WellheadPopover = ({ children, data }) => {
  const dispatch = useDispatch();

  return (
    <Popover
      isOpen={true}
      position={["bottom", "right", "top", "left"]}
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
          <WellheadPopoverWidget data={data} />
        </ArrowContainer>
      )}
    >
      {children}
    </Popover>
  );
};

export default WellheadPopover;
