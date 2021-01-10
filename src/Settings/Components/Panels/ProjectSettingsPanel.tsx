import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useDrag } from "react-dnd";
import AnalyticsTitle from "../../../Application/Components/Basic/AnalyticsTitle";
import ItemTypes from "../../Utils/DragAndDropItemTypes";
import Flowstation from "../../Images/Flowstation.svg";
import Manifold from "../../Images/Manifold.svg";

const useStyles = makeStyles(() => ({
  settingsPanel: {
    display: "flex",
    flexDirection: "column",
    // alignItems: "flex-start",
    // justifyContent: "flex-start",
    height: "100%",
    // border: "1px solid #C4C4C4",
    width: "100%",
    // overflow: "auto",
  },
}));

interface IProjectSettingsProps {
  name: string;
}
interface IProjectSettings {
  name: string;
  label: string;
  icon: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >;
}

const ProjectSettingsType: React.FC<IProjectSettingsProps> = ({ name }) => {
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.PROJECT_SETTINGS_TYPE,
      calculationName: name,
    },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  });

  const settings = [
    {
      name: "unitSettings",
      label: "Unit Settings",
      icon: (
        <img src={Manifold} alt="Net Cashflow" height={"100%"} width={"100%"} />
      ),
    },
    {
      name: "dbSettings",
      label: "Database Settings",
      icon: (
        <img
          src={Flowstation}
          alt="Net Present Value"
          height={"100%"}
          width={"100%"}
        />
      ),
    },
  ];

  const opacity = isDragging ? 0.4 : 1;
  const currentSetting: IProjectSettings = settings.find(
    (calculation) => calculation.name === name
  ) as IProjectSettings;

  return (
    <div
      style={{
        height: "80px",
        width: "100%",
        padding: "10px",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div
        ref={drag}
        style={{
          opacity,
          height: "60px",
          width: "60px",
          cursor: "pointer",
          border: "1px solid grey",
          padding: "5px",
        }}
      >
        {currentSetting.icon}
      </div>
      <div
        style={{
          height: "60px",
          width: "auto",
          padding: "5px",
          verticalAlign: "middle",
        }}
      >
        {currentSetting.label}
      </div>
    </div>
  );
};

const ProjectSettingsPanel = () => {
  const classes = useStyles();
  const projectSettingNames = ["unitSettings", "dbSettings"];

  return (
    <>
      <AnalyticsTitle title="Settings Panel" />
      <div className={classes.settingsPanel}>
        {projectSettingNames.map((name, i) => (
          <ProjectSettingsType key={i} name={name} />
        ))}
      </div>
    </>
  );
};

export default ProjectSettingsPanel;
