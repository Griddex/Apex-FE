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

  const {
    ECONOMICS_SENSITIVITIES_XAXIS,
    ECONOMICS_SENSITIVITIES_YAXIS,
    ECONOMICS_SENSITIVITIES_ZAXIS,
  } = ItemTypes;

  const [accepts, setAccepts] = React.useState([
    ECONOMICS_SENSITIVITIES_XAXIS,
    ECONOMICS_SENSITIVITIES_YAXIS,
    ECONOMICS_SENSITIVITIES_ZAXIS,
  ]);

  const [analysisOption, setAnalysisOption] = React.useState(
    economicsAnalysesOptions[0]
  );
  const [isDroppedOnZ, setIsDroppedOnZ] = React.useState(false);
  const [parameter3, setParameter3] = React.useState("Z");

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.ECONOMICS_SENSITIVITIES,
    drop: (item, monitor) => {
      console.log(
        "Logged output --> ~ file: SensitivitiesHeatMapChart.tsx ~ line 45 ~ SensitivitiesHeatMapChart ~ monitor",
        monitor.getDropResult()
      );
      // const index = accepts.findIndex(
      //   (v) => v === ItemTypes.ECONOMICS_SENSITIVITIES
      // );
      // accepts.splice(index + 1);
      // setAccepts(accepts);
      // setIsDroppedOnZ(true);
      alert(`You dropped ${item}`);
      console.log(
        "Logged output --> ~ file: SensitivitiesHeatMapChart.tsx ~ line 59 ~ SensitivitiesHeatMapChart ~ item",
        item
      );
    },
    collect: (monitor) => {
      return {
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      };
    },
  });

  const isActive = canDrop && isOver;
  let dndCanvasStyle = {};
  if (isActive) {
    dndCanvasStyle = {
      border: `1px solid ${theme.palette.primary.main}`,
      backgroundColor: theme.palette.primary.light,
    };
  } else if (canDrop) {
    dndCanvasStyle = {
      border: `1px solid ${theme.palette.primary.main}`,
    };
  }

  return (
    <CenteredStyle
      ref={drop}
      flexDirection="column"
      height={"calc(100% - 50px)"}
    >
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
          // ref={drop}
          style={{
            width: 500,
            height: 40,
            backgroundColor: theme.palette.grey["100"],
            ...dndCanvasStyle,
          }}
        >
          <Typography variant="h6" align="center">
            {"X Axis"}
          </Typography>
        </div>
        <CenteredStyle justifyContent="space-around">
          <div
            // ref={drop}
            style={{
              width: 500,
              height: 40,
              backgroundColor: theme.palette.grey["100"],
              transform: `rotate(90deg)`,
              ...dndCanvasStyle,
            }}
          >
            <Typography variant="h6" align="center">
              {"Y Axis"}
            </Typography>
          </div>
          <div style={{ height: "calc(100% - 100px)", width: "100%" }}>
            <EconomicsSensitivitiesHeatMap />
          </div>
          <div
            // ref={drop}
            style={{
              width: 300,
              height: 400,
              backgroundColor: theme.palette.grey["100"],
              ...dndCanvasStyle,
            }}
          >
            <Typography variant="h6" align="center">
              {"Z Axis"}
            </Typography>
            {isDroppedOnZ && (
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
            )}
          </div>
        </CenteredStyle>
      </CenteredStyle>
    </CenteredStyle>
  );
};

export default SensitivitiesHeatMapChart;
