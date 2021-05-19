import { makeStyles, useTheme } from "@material-ui/core/styles";
import CallMadeOutlinedIcon from "@material-ui/icons/CallMadeOutlined";
import CategoryOutlinedIcon from "@material-ui/icons/CategoryOutlined";
import React from "react";
import { useDispatch } from "react-redux";
import Select, { Styles, ValueType } from "react-select";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import ApexFlexStyle from "../../../Application/Components/Styles/ApexFlexStyle";
import getRSStyles from "../../../Application/Utils/GetRSStyles";
import getRSTheme from "../../../Application/Utils/GetRSTheme";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#FFF",
    padding: 20,
  },
}));

export interface IChartDataPanel {
  selectLabel: string;
  selectedOption: ISelectOption;
  titleOptions: ISelectOption[];
  selectedTitle: string;
  handleSelectChange: (row: ValueType<ISelectOption, false>) => void;
  treeViewComponent: React.FC;
  categoriesAction?: () => void;
}

const ChartDataPanel = ({
  selectLabel,
  selectedOption,
  titleOptions,
  handleSelectChange,
  treeViewComponent: TreeViewComponent,
  categoriesAction,
}: IChartDataPanel) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const SelectTitle = () => {
    const RSStyles: Styles<ISelectOption, false> = getRSStyles(theme);

    return (
      <Select
        value={selectedOption}
        options={titleOptions}
        styles={RSStyles}
        onChange={handleSelectChange}
        menuPortalTarget={document.body}
        theme={(thm) => getRSTheme(thm, theme)}
      />
    );
  };

  return (
    <ApexFlexStyle flexDirection="column">
      <AnalyticsComp
        title={selectLabel}
        content={
          <div style={{ display: "flex", alignItems: "center" }}>
            <SelectTitle />
            <CallMadeOutlinedIcon />
          </div>
        }
        direction="Vertical"
        containerStyle={{ width: "100%", marginBottom: 20 }}
      />
      <div
        style={{
          width: "100%",
          height: "100%",
          borderBottom: `1px solid ${theme.palette.grey[300]}`,
        }}
      >
        <TreeViewComponent />
      </div>
      <ApexFlexStyle height={50} justifyContent="flex-end">
        <CategoryOutlinedIcon onClick={categoriesAction} />
      </ApexFlexStyle>
    </ApexFlexStyle>
  );
};

export default ChartDataPanel;
