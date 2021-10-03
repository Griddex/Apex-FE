import { Badge } from "@mui/material";
import React from "react";

export interface IWithBadge {
  InnerComponent: React.FC;
}

const WithBadge = ({ InnerComponent, ...rest }: IWithBadge) => {
  return (
    <Badge {...rest}>
      <InnerComponent />
    </Badge>
  );
};

export default WithBadge;
