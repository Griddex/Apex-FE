import React from "react";
import Dropzone from "react-dropzone";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
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

const UserAvatar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const avatarURL = useSelector((state) => state.registerReducer.avatarURL);

  return (
    <Dropzone
      accept="image/*"
      onDropAccepted={(acceptedFile) => {
        const avatarImage = acceptedFile[0];
        const avatarUrl = URL.createObjectURL(avatarImage);
        dispatch(persistAvatarToReduxAction(avatarUrl));
      }}
      //   disabled={isDisabled}
      minSize={0}
      maxSize={10485760}
      multiple={false}
    >
      {({ getRootProps, getInputProps, isDragReject }) => {
        return (
          <Grid container dire>
            <section className={classes.dropZone}>
              {/* {isDragReject && (
                  <Typography>File type not accepted</Typography>
                )} */}
              <div {...getRootProps()} className={classes.dropZoneDiv}>
                <input {...getInputProps()} className={classes.dropZoneInput} />
                <div className={classes.dropZoneImgPDiv}>
                  <img src={avatarURL} height={150} width={150} />
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
