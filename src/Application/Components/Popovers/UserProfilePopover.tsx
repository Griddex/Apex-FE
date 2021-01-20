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
          return <UserProfile />;
        }}
      </Motion>
    </Popover>
  );
};

export default UserProfilePopover;
