import React from "react";
import ApexFlexContainer from "../Components/Styles/ApexFlexContainer";

export interface IWithUnit {
  InnerComponent: React.FC<{
    ref: React.MutableRefObject<HTMLElement | undefined>;
  }>;
  unit: string;
}

const WithUnit = ({ InnerComponent, unit }: IWithUnit) => {
  const ref = React.useRef<HTMLElement>();

  const { top, left } = ref?.current?.getBoundingClientRect() as DOMRect;

  return (
    <ApexFlexContainer>
      <InnerComponent ref={ref} />
      <div style={{ top, left }}>{unit}</div>
    </ApexFlexContainer>
  );
};

export default WithUnit;
