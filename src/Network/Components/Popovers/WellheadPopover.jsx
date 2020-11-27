import React from "react";
import Popover, { ArrowContainer } from "react-tiny-popover";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { showPopoverAction } from "./../../Redux/Actions/NetworkActions";

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
      <div>{name}</div>
      <hr />
      <div>
        {data &&
          data.map((obj, i) => {
            return (
              <div key={i} className={classes.popoverItemContainer}>
                <div className={classes.popoverItem}>
                  <div>String:</div>
                  <div>{` ${obj.String}`}</div>
                </div>
                <div className={classes.popoverItem}>
                  <div>Reservoir:</div>
                  <div>{` ${obj.Reservoir}`}</div>
                </div>
                <div className={classes.popoverItem}>
                  <div>Hydrocarbon Stream:</div>
                  <div>{` ${obj["Hydrocarbon Stream"]}`}</div>
                </div>
                <div className={classes.popoverItem}>
                  <div>
                    {` ${
                      obj["Hydrocarbon Stream"] === "OIL"
                        ? "Initial Oil Rate"
                        : "Initial Gas Rate"
                    }`}
                  </div>
                  <div>{obj["Init. Oil/Gas Rate 2P/2C"]}</div>
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
