import React from "react";
import { useParams } from "react-router-dom";
import ImportLayout from "./../../Import/Routes/Common/ImportLayout";
import NetworkLayout from "./../../Network/Common/NetworkLayout";
import VisualizationLayout from "./../../Visualization/Common/VisualizationLayout";
import ProductBackground from "./ProductBackground";

const LayoutSelector = (props) => {
  const { layoutId } = useParams();

  const Layouts = {
    background: <ProductBackground {...props} />,
    import: <ImportLayout {...props} />,
    network: <NetworkLayout {...props} />,
    visualization: <VisualizationLayout {...props} />,
  };

  return Layouts[layoutId];
};

export default LayoutSelector;
