import React from "react";

import Image from "../../Application/Components/Visuals/Image";
import { TNodeTypes } from "../Components/Widgets/WidgetTypes";
import DrainagePoint from "../Images/DrainagePoint.svg";
import Flowstation from "../Images/Flowstation.svg";
import GasFacility from "../Images/GasFacility.svg";
import GatheringCenter from "../Images/GatheringCenter.svg";
import Manifold from "../Images/Manifold.svg";
import Terminal from "../Images/Terminal.svg";

export const nodeImages = {
  drainagePoint: (
    <Image src={DrainagePoint} width={24} height={24} alt="DrainagePoint" />
  ),
  flowstation: (
    <Image src={Flowstation} width={24} height={24} alt="Flowstation" />
  ),
  gasFacility: (
    <Image src={GasFacility} width={24} height={24} alt="GasFacility" />
  ),
  gatheringCenter: (
    <Image src={GatheringCenter} width={24} height={24} alt="GatheringCenter" />
  ),
  manifold: <Image src={Manifold} width={24} height={24} alt="Manifold" />,
  terminal: <Image src={Terminal} width={24} height={24} alt="Terminal" />,
} as Record<TNodeTypes, JSX.Element>;
