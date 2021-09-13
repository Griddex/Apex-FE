import { Badge } from "@material-ui/core";
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
