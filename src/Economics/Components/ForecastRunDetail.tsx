import { Container, makeStyles } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import ShowChartIcon from "@material-ui/icons/ShowChart";
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
    // justifyContent: "",
    height: 80,
    width: "100%",
    borderBottom: "1px solid #C4C4C4",
  },
  midSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: 580,
    width: "100%",
    borderTop: "1px solid #C4C4C4",
  },
  bottomSection: {
    display: "flex",
    flexDirection: "row-reverse",
    height: 50,
    width: "100%",
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
  selectItem: {},
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

const RunDetail = (props: IForecastDetail) => {
  const classes = useStyles();
  const {
    titleName,
    statusText,
    author,
    approvers,
    createdOn,
    modifiedOn,
  } = props;
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: {
    target: { checked: React.SetStateAction<boolean> };
  }) => {
    setChecked(event.target.checked);
  };

  return (
    <div className={classes.container}>
      <div className={classes.topSection}>
        <ShowChartIcon />
        <div>{titleName}</div>
      </div>
      <div className={classes.midSection}>
        <AnalyticsComp
          title="Status"
          content={<Status statusText={statusText} />}
          direction="Horizontal"
        />
        <AnalyticsComp
          title="Author"
          content={<Author author={author} />}
          direction="Horizontal"
        />

        {approvers ? (
          <AnalyticsComp
            title="Approvers"
            content={<Approvers approvers={approvers} />}
            direction="Horizontal"
            titleStyle={{ height: "50px" }}
          />
        ) : (
          "None"
        )}
        <AnalyticsText
          title="Created On"
          text={createdOn.toString()}
          direction="Horizontal"
        />
        <AnalyticsText
          title="Modified On"
          text={modifiedOn.toString()}
          direction="Horizontal"
        />
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
    </div>
  );
};

const ForecastRunDetail = () => {
  const classes = useStyles();
  const forecastDetail = {
    titleName: "ARPR_FORECAST_DECK_2020",
    statusText: "Approved",
    author: { imgUrl: shirleyImg, name: "Shirley Fraser" },
    approvers: [
      { imgUrl: anitaImg, name: "Anita Stragan" },
      { imgUrl: glenImg, name: "Glen Moore John III" },
      { imgUrl: kerryImg, name: "Kerry Schwarzenegger" },
    ],
    createdOn: formatDate(new Date(2020, 12, 19)),
    modifiedOn: formatDate(new Date(2020, 12, 23)),
  };

  return (
    <Container className={classes.container} maxWidth="sm" fixed disableGutters>
      <AnalyticsTitle title="Forecast Details" />
      <RunDetail {...forecastDetail} />
    </Container>
  );
};

export default ForecastRunDetail;
