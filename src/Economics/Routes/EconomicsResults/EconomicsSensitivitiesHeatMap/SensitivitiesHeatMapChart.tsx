import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  useTheme,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ValueType } from "react-select";
import ApexSelectRS from "../../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../../Application/Components/Selects/SelectItemsType";
import CenteredStyle from "../../../../Application/Components/Styles/CenteredStyle";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import { economicsAnalysesOptions } from "../../../Data/EconomicsData";
import EconomicsSensitivitiesHeatMap from "./EconomicsSensitivitiesHeatMap";
import { DragObjectWithType, DropTargetMonitor, useDrop } from "react-dnd";
import ItemTypes from "../../../Utils/DragAndDropItemTypes";

const SensitivitiesHeatMapChart = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { selectedChartIndex } = useSelector(
    (state: RootState) => state.chartReducer
  );

  const [analysisOption, setAnalysisOption] = React.useState(
    economicsAnalysesOptions[0]
  );
  const [parameter3, setParameter3] = React.useState("Z");

  const [{ isOverY, canDropY }, dropY] = useDrop({
    accept: ItemTypes.ECONOMICS_SENSITIVITIES_YAXIS,
    drop: (item, monitor) => alert(`You dropped ${item}`),
    collect: (monitor) => {
      return {
        isOverY: !!monitor.isOver(),
        canDropY: !!monitor.canDrop(),
      };
    },
  });

  const isActiveY = canDropY && isOverY;
  let dndCanvasStyleY = {};
  if (isActiveY) {
    dndCanvasStyleY = {
      border: "1px solid green",
    };
  } else if (canDropY) {
    dndCanvasStyleY = {
      border: "1px solid grey",
    };
  }

  const [{ isOverX, canDropX }, dropX] = useDrop({
    accept: ItemTypes.ECONOMICS_SENSITIVITIES_XAXIS,
    drop: (item, monitor) => console.log(item, monitor),
    collect: (monitor) => {
      return {
        isOverX: !!monitor.isOver(),
        canDropX: !!monitor.canDrop(),
      };
    },
  });

  const isActiveX = canDropX && isOverX;
  let dndCanvasStyleX = {};
  if (isActiveX) {
    dndCanvasStyleX = {
      border: "1px solid green",
    };
  } else if (canDropX) {
    dndCanvasStyleX = {
      border: "1px solid grey",
    };
  }

  return (
    <CenteredStyle flexDirection="column" height={"calc(100% - 50px)"}>
      <CenteredStyle width={300} height={50} moreStyles={{ marginBottom: 40 }}>
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
      <CenteredStyle flexDirection="column">
        <div
          ref={dropX}
          style={{
            width: 500,
            height: 40,
            backgroundColor: theme.palette.grey["100"],
            ...dndCanvasStyleX,
          }}
        >
          <Typography variant="h6" align="center">
            {"X Axis"}
          </Typography>
        </div>
        <CenteredStyle justifyContent="space-around">
          <div
            ref={dropY}
            style={{
              width: 500,
              height: 40,
              backgroundColor: theme.palette.grey["100"],
              transform: `rotate(90deg)`,
              ...dndCanvasStyleY,
            }}
          >
            <Typography variant="h6" align="center">
              {"Y Axis"}
            </Typography>
          </div>
          <div style={{ height: "calc(100% - 100px)", width: "100%" }}>
            <EconomicsSensitivitiesHeatMap />
          </div>
          <RadioGroup
            value={parameter3}
            onChange={(
              event: React.ChangeEvent<HTMLInputElement>,
              value: string
            ) => setParameter3(value)}
            style={{ flexDirection: "row" }}
          >
            <FormControlLabel
              value="value1"
              control={<Radio />}
              label="Value 1"
            />
            <FormControlLabel
              value="value2"
              control={<Radio />}
              label="Value 2"
            />
            <FormControlLabel
              value="value3"
              control={<Radio />}
              label="Value 3"
            />
          </RadioGroup>
        </CenteredStyle>
      </CenteredStyle>
    </CenteredStyle>
  );
};

export default SensitivitiesHeatMapChart;
