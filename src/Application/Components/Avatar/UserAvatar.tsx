import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);
import { persistUserAvatarAction } from "../../../Administration/Redux/Actions/UserActions";
import { RootState } from "../../Redux/Reducers/AllReducers";

const useStyles = makeStyles(() => ({
  dropZone: {
    borderStyle: "dotted",
    borderWidth: 0,
    height: "99%",
    width: "99%",
  },
  dropZoneDiv: {
    height: "100%",
    width: "100%",
    textAlign: "center",
  },
  dropZoneInput: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    width: "100%",
    textAlign: "center",
  },
  dropZoneParagraph: {
    height: "100%",
    width: "60%",
    textAlign: "center",
  },
  dropZoneImgPDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const avatarUrlSelector = createDeepEqualSelector(
  (state: RootState) => state.adminReducer.avatarUrl,
  (avatarUrl) => avatarUrl
);

const UserAvatar: React.FC<JSX.Element> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const avatarUrl = useSelector(avatarUrlSelector);

  return (
    <Dropzone
      accept="image/*"
      onDropAccepted={(acceptedFile) => {
        const avatarImage = acceptedFile[0];
        const avatarUrl = URL.createObjectURL(avatarImage);
        dispatch(persistUserAvatarAction(avatarUrl));
      }}
      //   disabled={isDisabled}
      minSize={0}
      maxSize={10485760}
      multiple={false}
    >
      {({ getRootProps, getInputProps, isDragReject }) => {
        return (
          <Grid container>
            <section className={classes.dropZone}>
              {isDragReject && <Typography>File type not accepted</Typography>}
              <div {...getRootProps()} className={classes.dropZoneDiv}>
                <input {...getInputProps()} className={classes.dropZoneInput} />
                <div className={classes.dropZoneImgPDiv}>
                  <img src={avatarUrl} height={150} width={150} />
                  <p className={classes.dropZoneParagraph}>
                    Drop Image or Click to Select
                  </p>
                </div>
              </div>
            </section>
          </Grid>
        );
      }}
    </Dropzone>
  );
};

export default UserAvatar;
