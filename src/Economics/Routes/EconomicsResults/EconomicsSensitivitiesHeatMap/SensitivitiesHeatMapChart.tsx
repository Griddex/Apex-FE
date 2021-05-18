import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  useTheme,
} from "@material-ui/core";
import React from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { ValueType } from "react-select";
import ApexSelectRS from "../../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../../Application/Components/Selects/SelectItemsType";
import CenteredStyle from "../../../../Application/Components/Styles/CenteredStyle";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import MapStyleFormatters from "../../../Components/MapStyleFormatters/MapStyleFormatters";
import { economicsAnalysesOptions, mapData } from "../../../Data/EconomicsData";
import { itemTypes } from "../../../Utils/DragAndDropItemTypes";
import EconomicsSensitivitiesHeatMap from "./EconomicsSensitivitiesHeatMap";

const SensitivitiesHeatMapChart = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { sensitivitiesHeatMapData, sensitivitiesHeatMapDataDisplayed } =
    useSelector((state: RootState) => state.economicsReducer);

  const [analysisOption, setAnalysisOption] = React.useState(
    economicsAnalysesOptions[0]
  );
  const [isDroppedOnZ, setIsDroppedOnZ] = React.useState(false);
  const [parameter3, setParameter3] = React.useState("Z");

  const [{ isOver, isOverCurrent, canDrop }, drop] = useDrop(
    () => ({
      accept: itemTypes.ECONOMICS_HEATMAP,
      drop: (item, monitor) => {
        const didDrop = monitor.didDrop();
        console.log(
          "Logged output --> ~ file: SensitivitiesHeatMapChart.tsx ~ line 45 ~ SensitivitiesHeatMapChart ~ monitor",
          monitor.getDropResult()
        );
        // const index = accepts.findIndex(
        //   (v) => v === itemTypes.ECONOMICS_SENSITIVITIES
        // );
        // accepts.splice(index + 1);
        // setAccepts(accepts);
        setIsDroppedOnZ(didDrop);
        alert(`You dropped ${item}`);
        console.log(
          "Logged output --> ~ file: SensitivitiesHeatMapChart.tsx ~ line 59 ~ SensitivitiesHeatMapChart ~ item",
          item
        );
      },
      collect: (monitor) => {
        return {
          isOver: !!monitor.isOver(),
          isOverCurrent: !!monitor.isOver({ shallow: true }),
          canDrop: !!monitor.canDrop(),
        };
      },
    }),
    [isDroppedOnZ]
  );

  const isActive = canDrop && isOverCurrent;
  let dropTargetStyle = {};
  if (isActive) {
    dropTargetStyle = {
      border: `1px solid ${theme.palette.primary.main}`,
      backgroundColor: theme.palette.primary.light,
    };
  } else if (canDrop) {
    dropTargetStyle = {
      border: `1px solid ${theme.palette.primary.main}`,
    };
  }

  return (
    <CenteredStyle
      ref={drop}
      flexDirection="column"
      height={"calc(100% - 50px)"}
    >
      <CenteredStyle width={300} height={50}>
        <ApexSelectRS
          valueOption={analysisOption}
          data={economicsAnalysesOptions}
          handleSelect={(option: ValueType<ISelectOption, false>) =>
            setAnalysisOption(option as ISelectOption)
          }
          menuPortalTarget={document.body}
          isSelectOptionType={true}
        />
      </CenteredStyle>

      <div style={{ height: "100%", width: "100%" }}>
        <EconomicsSensitivitiesHeatMap
          mapDataDisplayed={sensitivitiesHeatMapDataDisplayed}
        />
      </div>
    </CenteredStyle>
  );
};

export default SensitivitiesHeatMapChart;
