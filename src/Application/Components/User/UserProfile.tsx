import { Badge, Button, makeStyles, Typography } from "@material-ui/core";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import TuneOutlinedIcon from "@material-ui/icons/TuneOutlined";
import React from "react";
import { useDispatch } from "react-redux";
import Image from "../../../Application/Components/Visuals/Image";
import { anitaImg } from "../../../Import/Utils/iconImages";
import {
  hideDialogAction,
  showDialogAction,
  unloadDialogsAction,
} from "../../Redux/Actions/DialogsAction";
import { ButtonProps, DialogStuff } from "../Dialogs/DialogTypes";
import { IIconNameComp, IUserDetails } from "./UserTypes";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import { logoutAction } from "../../Redux/Actions/LogoutActions";
import { useHistory } from "react-router-dom";

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
const userProfileData: IUserDetails = {
  avatarUrl: anitaImg,
  name: "Gideon Sanni",
  callName: "Gideon",
  email: "gideon.sanni@syncware.com",
  jobTitle: "Senior Reservoir Engineer",
  role: "Corporate Forecaster",
};

const IconNameComp = ({ icon, name, iconNameStyles }: IIconNameComp) => {
  return (
    <div style={iconNameStyles}>
      <div>{icon}</div>
      <div style={{ marginLeft: 5 }}>{name}</div>
    </div>
  );
};

const iconNameStyles = { display: "flex", marginTop: 5, marginBottom: 5 };

const UserProfile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

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
            localStorage.clear();
            localStorage.clear();
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
        <Image className={classes.image} src={userProfileData.avatarUrl} />
        <Typography className={classes.userName}>
          {userProfileData.name}
        </Typography>
        <Typography variant="caption">{userProfileData.email}</Typography>
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
