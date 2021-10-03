import { CSSProperties } from "react";
import { IStoredDataProps } from "../../Application/Types/ApplicationTypes";

export interface IStoredNetworks {
  workflowProcess: NonNullable<IStoredDataProps["wkPs"]>;
  containerStyle?: CSSProperties;
}
