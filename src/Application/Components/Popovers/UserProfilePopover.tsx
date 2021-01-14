import Popover from "react-awesome-popover";
import React from "react";
import { IUserProfilePopover } from "./PopoverTypes";
import { Motion, spring } from "react-motion";
import UserProfile from "../User/UserProfile";

const UserProfilePopover = ({ children }: IUserProfilePopover) => {
  return (
    <Popover
      placement="bottom-center"
      arrowProps={{ style: { color: "white" } }}
    >
      {children}
      <Motion defaultStyle={{ rotateY: 90 }} style={{ rotateY: spring(0) }}>
        {(style) => {
          console.log(
            "Logged output --> ~ file: UserProfilePopover.tsx ~ line 18 ~ UserProfilePopover ~ style",
            style
          );
          return (
            // <div style={style}>
            <UserProfile />
            // </div>
          );
        }}
      </Motion>
    </Popover>
  );
};

export default UserProfilePopover;
