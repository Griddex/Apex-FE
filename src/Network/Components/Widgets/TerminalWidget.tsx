import { Handle, Position, Node } from "@griddex/react-flow-updated";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Application/Redux/Reducers/RootReducer";
import Terminal from "../../Images/Terminal.svg";
import TerminalPopover from "../Popovers/TerminalPopover";

const TerminalWidget = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Handle
        type="target"
        position={Position.Bottom}
        style={{
          background: "#999",
          borderWidth: "0px",
          height: "4px",
          width: "4px",
          borderRadius: "0px",
        }}
      />
      <img
        src={Terminal}
        width={40}
        height={40}
        draggable={false}
        alt="Terminal"
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{
          background: "#999",
          borderWidth: "0px",
          height: "4px",
          width: "4px",
          borderRadius: "0px",
        }}
      />
    </div>
  );
};

const TerminalNode = React.memo((props: Node) => {
  const { data } = props;
  const { name } = data;
  const { showPopover, currentPopoverId } = useSelector(
    (state: RootState) => state.networkReducer
  );

  return (
    <>
      {showPopover && props.id === currentPopoverId ? (
        <TerminalPopover data={name}>
          <div>
            <TerminalWidget />
          </div>
        </TerminalPopover>
      ) : (
        <TerminalWidget />
      )}
    </>
  );
});

export default TerminalNode;
