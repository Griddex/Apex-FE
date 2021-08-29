import React from "react";
import Dropzone from "react-dropzone";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { RootState } from "../../Redux/Reducers/AllReducers";
import { persistUserAvatarAction } from "../../../Administration/Redux/Actions/UserActions";

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

const UserAvatar: React.FC<JSX.Element> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { avatarUrl } = useSelector((state: RootState) => state.adminReducer);

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
