import { Container, makeStyles, Typography } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import LandscapeTwoToneIcon from "@material-ui/icons/LandscapeTwoTone";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import React from "react";
import Approvers from "../../Application/Components/Approvers/Approvers";
import Author, {
  IPersonDetail,
} from "../../Application/Components/Author/Author";
import AnalyticsTitle from "../../Application/Components/Basic/AnalyticsTitle";
import AnalyticsText from "../../Application/Components/Basic/AnalyticsText";
import AnalyticsComp from "../../Application/Components/Basic/AnalyticsComp";
import Status from "../../Application/Components/Status/Status";
import formatDate from "../../Application/Utils/FormatDate";
import {
  anitaImg,
  glenImg,
  kerryImg,
  shirleyImg,
} from "./../../Import/Utils/iconImages";
import MainTitle from "../../Application/Components/Basic/MainTitle";
import { useSelector } from "react-redux";
import { RootState } from "../../Application/Redux/Reducers/RootReducer";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    alignItems: "center",
    // justifyContent: "",
    border: "1px solid #C4C4C4",
    backgroundColor: "#FFF",
    padding: 20,
  },
  topSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 60,
    width: "100%",
    "& p:nth-child(2)": { marginLeft: 10 },
  },
  midSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    height: "auto",
    width: "100%",
    borderTop: "1px solid #C4C4C4",
    marginTop: 20,
    "& > *": { marginTop: 20 },
  },
  bottomSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    height: "auto",
    width: "100%",
    marginTop: 30,
  },
  connect: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "auto",
  },
  button: {
    color: theme.palette.primary.main,
    border: `1.5px solid ${theme.palette.primary.main}`,
    fontWeight: "bold",
  },
  connectButton: {
    color: theme.palette.primary.main,
    border: `1.5px solid ${theme.palette.primary.main}`,
    fontWeight: "bold",
    width: 184,
  },
  checkBox: { margin: 0 },
  forecastRunInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    "& p:nth-child(1)": { width: 120 },
  },
  forecastRunInfoContent: {
    flexGrow: 1,
  },
}));

export type StatusTextType = "Approved" | "Pending" | "Returned" | string;
export interface IForecastDetail {
  titleName: string;
  statusText: StatusTextType;
  author: IPersonDetail;
  approvers?: IPersonDetail[] | string;
  createdOn: Date;
  modifiedOn: Date;
}

interface IForecastRunInfo {
  Title: () => JSX.Element;
  Content: () => JSX.Element;
}

const ForecastRunDetail = () => {
  const classes = useStyles();
  const { forecastRun } = useSelector(
    (state: RootState) => state.economicsReducer
  );

  const forecastDetails: Record<string, IForecastDetail> = {
    ForecastRun_1: {
      titleName: "ForecastRun_1",
      statusText: "Approved",
      author: { imgUrl: shirleyImg, name: "Shirley Fraser" },
      approvers: [
        { imgUrl: anitaImg, name: "Anita Stragan" },
        { imgUrl: glenImg, name: "Glen Moore John III" },
        { imgUrl: kerryImg, name: "Kerry Schwarzenegger" },
      ],
      createdOn: formatDate(new Date(2020, 12, 19)),
      modifiedOn: formatDate(new Date(2020, 12, 23)),
    },
    ForecastRun_2: {
      titleName: "ForecastRun_2",
      statusText: "Pending",
      author: { imgUrl: glenImg, name: "Glen Moore John III" },
      approvers: [{ imgUrl: anitaImg, name: "Anita Stragan" }],
      createdOn: formatDate(new Date(2018, 2, 20)),
      modifiedOn: formatDate(new Date(2019, 12, 23)),
    },
    ForecastRun_3: {
      titleName: "ForecastRun_1",
      statusText: "Approved",
      author: { imgUrl: kerryImg, name: "Kerry Schwarzenegger" },
      approvers: [
        { imgUrl: anitaImg, name: "Anita Stragan" },
        { imgUrl: glenImg, name: "Glen Moore John III" },
      ],
      createdOn: formatDate(new Date(2020, 6, 30)),
      modifiedOn: formatDate(new Date(2020, 8, 15)),
    },
  };

  const {
    titleName,
    statusText,
    author,
    approvers,
    createdOn,
    modifiedOn,
  } = forecastDetails[forecastRun ? forecastRun : "ForecastRun_1"];

  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: {
    target: { checked: React.SetStateAction<boolean> };
  }) => {
    setChecked(event.target.checked);
  };

  const Name = () => (
    <div className={classes.forecastRunInfoContent}>
      <div className={classes.topSection}>
        <LandscapeTwoToneIcon fontSize="large" />
        <Typography variant="subtitle1">{titleName}</Typography>
      </div>
    </div>
  );

  const ForecastRunInfo = (props: IForecastRunInfo) => {
    const { Title, Content } = props;

    return (
      <div className={classes.forecastRunInfo}>
        <Title />
        <Content />
      </div>
    );
  };

  const items = [
    {
      Title: () => <AnalyticsTitle title="Name" />,
      Content: () => <Name />,
    },
    {
      Title: () => <AnalyticsTitle title="Status" />,
      Content: () => <Status statusText={statusText} />,
    },
    {
      Title: () => <AnalyticsTitle title="Author" />,
      Content: () => <Author author={author} />,
    },
    {
      Title: () => <AnalyticsTitle title="Approvers" />,
      Content: () => <Approvers approvers={approvers ? approvers : "None"} />,
    },
    {
      Title: () => <AnalyticsTitle title="Created On" />,
      Content: () => <Typography>{createdOn.toString()}</Typography>,
    },
    {
      Title: () => <AnalyticsTitle title="Modified On" />,
      Content: () => <Typography>{modifiedOn.toString()}</Typography>,
    },
  ];

  return (
    <div className={classes.container}>
      {forecastRun ? (
        <>
          <MainTitle title="Forecast Details" />
          <div className={classes.midSection}>
            {items.map((item, i) => (
              <ForecastRunInfo
                key={i}
                Title={item.Title}
                Content={item.Content}
              />
            ))}
          </div>
          <div className={classes.bottomSection}>
            <Checkbox
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "primary checkbox" }}
            />
            <VisibilityOutlinedIcon />
            <DeleteOutlineOutlinedIcon />
          </div>
        </>
      ) : (
        <Typography>{"Select Forecast"}</Typography>
      )}
    </div>
  );
};

export default ForecastRunDetail;
