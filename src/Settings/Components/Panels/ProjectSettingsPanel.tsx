import makeStyles from '@mui/styles/makeStyles';
import React from "react";
import { useDrag } from "react-dnd";
import AnalyticsTitle from "../../../Application/Components/Basic/AnalyticsTitle";
import { itemTypes } from "../../Utils/DragAndDropItemTypes";
import DatabaseSettings from "../../Images/DatabaseSettings.svg";
import UnitSettings from "../../Images/UnitSettings.svg";

const useStyles = makeStyles(() => ({
  settingsPanel: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
}));

interface IProjectSettingsProps {
  title: string;
}
interface IProjectSettings {
  name: string;
  label: string;
  icon: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >;
}

const ProjectSettingsType: React.FC<IProjectSettingsProps> = ({ title }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: itemTypes.PROJECT_SETTINGS_TYPE,
    item: {
      calculationName: title,
    },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  }));

  const settings = [
    {
      name: "unitSettings",
      label: "Unit Settings",
      icon: (
        <img
          src={UnitSettings}
          alt="Net Cashflow"
          height={"100%"}
          width={"100%"}
        />
      ),
    },
    {
      name: "dbSettings",
      label: "Database Settings",
      icon: (
        <img
          src={DatabaseSettings}
          alt="Net Present Value"
          height={"100%"}
          width={"100%"}
        />
      ),
    },
  ];

  const opacity = isDragging ? 0.4 : 1;
  const currentSetting: IProjectSettings = settings.find(
    (calculation) => calculation.name === title
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
          <ProjectSettingsType key={i} title={name} />
        ))}
      </div>
    </>
  );
};

export default ProjectSettingsPanel;
