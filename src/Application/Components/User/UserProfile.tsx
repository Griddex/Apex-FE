import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import { Badge, Button, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Image from "../../../Application/Components/Visuals/Image";
import {
  hideDialogAction,
  showDialogAction,
  unloadDialogsAction,
} from "../../Redux/Actions/DialogsAction";
import { logoutAction } from "../../Redux/Actions/LogoutActions";
import { RootState } from "../../Redux/Reducers/AllReducers";
import { ButtonProps, DialogStuff } from "../Dialogs/DialogTypes";
import { IIconNameComp } from "./UserTypes";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const useStyles = makeStyles((theme) => ({
  image: { height: 80, width: 80 },
  userProfile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "white",
    height: 180,
    padding: 5,
  },
  userName: { fontWeight: "bold" },
  userLogout: {
    fontWeight: "bold",
    width: 70,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  badge: { marginRight: 15 },
}));

//TODO: Saga to grab user profile information from server
//Put data in store and retrieve here using useSelector
/* const userProfileData: IUserDetails = {
  avatarUrl: anitaImg,
  name: "Gideon Sanni",
  callName: "Gideon",
  email: "gideon.sanni@syncware.com",
  jobTitle: "Senior Reservoir Engineer",
  role: "Corporate Forecaster",
}; */

const IconNameComp = ({ icon, name, iconNameStyles }: IIconNameComp) => {
  return (
    <div style={iconNameStyles}>
      <div>{icon}</div>
      <div style={{ marginLeft: 5 }}>{name}</div>
    </div>
  );
};

const iconNameStyles = { display: "flex", marginTop: 5, marginBottom: 5 };

const loginPartialPropsSelector = createDeepEqualSelector(
  (state: RootState) => state.loginReducer,
  (reducer) => reducer
);

const UserProfile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const avatarSrc = localStorage.getItem("avatar");

  const { userName, email } = useSelector(loginPartialPropsSelector);

  const logoutDecision = () => {
    const logoutDialogActions = () => {
      const buttonsData: ButtonProps[] = [
        {
          title: "Cancel",
          variant: "contained",
          color: "secondary",
          startIcon: <CloseOutlinedIcon />,
          handleAction: () => dispatch(hideDialogAction()),
        },
        {
          title: "Okay",
          variant: "contained",
          color: "primary",
          startIcon: <DoneOutlinedIcon />,
          handleAction: () => {
            sessionStorage.clear();
            sessionStorage.clear();
            history.replace("/");
            dispatch(unloadDialogsAction());
            dispatch(logoutAction());
          },
        },
      ];

      return (
        <>
          {buttonsData.map((button, i) => (
            <Button
              key={i}
              variant={button.variant}
              color={button.color}
              onClick={() =>
                button?.handleAction && button?.handleAction(i as number)
              }
              startIcon={button.startIcon}
            >
              {button.title}
            </Button>
          ))}
        </>
      );
    };

    const dialogParameters: DialogStuff = {
      name: "Logout_Dialog",
      title: "Logout Confirmation",
      type: "textDialog",
      show: true,
      exclusive: true,
      maxWidth: "xs",
      iconType: "select",
      dialogText: "Do you want to logout?",
      actionsList: () => logoutDialogActions(),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
    };

    dispatch(showDialogAction(dialogParameters));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: 220,
        height: "auto",
        borderRadius: 10,
      }}
    >
      <div className={classes.userProfile}>
        <Image className={classes.image} src={avatarSrc} />
        <Typography className={classes.userName}>{userName}</Typography>
        <Typography variant="caption">{email}</Typography>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#F7F7F7",
          width: "100%",
          padding: 5,
        }}
      >
        <IconNameComp
          icon={<PersonOutlineOutlinedIcon />}
          name="Profile"
          iconNameStyles={iconNameStyles}
        />
        <IconNameComp
          icon={<TuneOutlinedIcon />}
          name="Account Settings"
          iconNameStyles={iconNameStyles}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginTop: 5,
            marginBottom: 5,
          }}
        >
          <IconNameComp
            icon={<NotificationsNoneOutlinedIcon />}
            name="Notifications"
            iconNameStyles={{ display: "flex" }}
          />
          <Badge
            className={classes.badge}
            badgeContent={100}
            color="secondary"
          />
        </div>
        <Button
          className={classes.userLogout}
          variant="contained"
          color="secondary"
          size="small"
          onClick={logoutDecision}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
