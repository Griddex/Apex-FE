import { Button, Input } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Form, Formik, FormikProps } from "formik";
import React from "react";
import AvatarEditor, { AvatarEditorProps } from "react-avatar-editor";
import Dropzone from "react-dropzone";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import AnalyticsTitle from "../../../Application/Components/Basic/AnalyticsTitle";
import { updateAdminParameterAction } from "../../Redux/Actions/AdminActions";
import { registerUserRequestAction } from "../../Redux/Actions/UserActions";
import adminState from "../../Redux/State/AdminState";
import userState from "../../Redux/State/UserState";
import { IUserState } from "../../Redux/State/UserStateTypes";
import AvatarControls from "../Avatar/AvatarControls";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    width: "90%",
    height: "90%",
  },
  formFields: {
    display: "flex",
    flexWrap: "wrap",
    height: "100%",
    maxWidth: 700,
    padding: 10,
  },
  avatarField: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    minWidth: 500,
    padding: 10,
  },
  keyContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    borderTop: `1px solid ${theme.palette.grey["400"]}`,
    height: "40%",
    width: "100%",
  },
  namesContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    borderTop: `1px solid ${theme.palette.grey["400"]}`,
    height: "40%",
    width: "100%",
  },
  emailMobileContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    borderTop: `1px solid ${theme.palette.grey["400"]}`,
    height: "10%",
    width: "100%",
  },
  jobRoleContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    borderTop: `1px solid ${theme.palette.grey["400"]}`,
    height: "10%",
    width: "100%",
  },
  regScenario: {
    width: "100%",
    height: 50,
  },
  regFormContainer: { display: "flex", width: "100%", height: "100%" },
  textFieldsContainer: {
    display: "flex",
    minWidth: "70%",
    height: "100%",
  },
  avatarContainer: {
    display: "flex",
    height: "100%",
    minWidth: 600,
  },
  button: {
    padding: theme.spacing(1),
    textAlign: "center",
    alignSelf: "center",
    width: 200,
    height: 50,
    margin: 0,
    fontWeight: "bold",
  },
  dndSection: {
    display: "flex",
    flexDirection: "column",
    height: 400,
    width: 400,
    alignItems: "center",
    justifyContent: "space-evenly",
    alignSelf: "center",
    cursor: "pointer",
  },
  dndArea: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "1px dashed #707070",
    backgroundColor: "#F7F7F7",
    borderRadius: 2,
    height: "100%",
    width: "100%",
    "&:hover": { backgroundColor: theme.palette.primary.light },
  },
  imageDnD: {
    width: 95,
    height: 80,
    color: theme.palette.primary.main,
  },
}));

const SingleRegisterForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const avatarRef = React.useRef(null);

  const basePath = "avatarStoreProps";

  const [registration, setRegistration] = React.useState(userState);

  const { avatarStoreProps } = adminState;
  const [avatarProps, setAvatarProps] =
    React.useState<AvatarEditorProps>(avatarStoreProps);

  const {
    image,
    width,
    height,
    border,
    scale,
    position,
    borderRadius,
    rotate,
  } = avatarProps;

  return (
    <Formik
      initialValues={userState as IUserState}
      validationSchema={Yup.object({
        userName: Yup.string().required("Username is required"),
        email: Yup.string().email().required("Email is required"),
        password: Yup.string().required("Password is required"),
      })}
      onSubmit={({ userName, email, password }) => {
        dispatch(registerUserRequestAction(userName, email, password));
      }}
    >
      {(props: FormikProps<IUserState>) => {
        const { errors, touched, handleChange, isSubmitting } = props;

        const handleFormChange =
          (name: string) =>
          (
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            handleChange(event);
            const { value } = event.target;

            setRegistration((prev) => ({ ...prev, [name]: value }));
          };

        const helperText = (name: keyof IUserState) =>
          touched && touched[name] ? errors && errors[name] : "";

        return (
          <Form className={classes.form}>
            <div style={{ display: "flex", height: "100%" }}>
              <div className={classes.formFields}>
                <div className={classes.keyContainer}>
                  <AnalyticsComp
                    title="UserName*"
                    direction="Vertical"
                    containerStyle={{ marginTop: 20, width: 300, height: 30 }}
                    content={
                      <Input
                        name="userName"
                        error={Boolean(helperText("userName"))}
                        value={registration["userName"]}
                        onChange={handleFormChange("userName")}
                        required
                        autoFocus
                        fullWidth
                      />
                    }
                  />
                  <AnalyticsComp
                    title="Email*"
                    direction="Vertical"
                    containerStyle={{ marginTop: 20, width: 300, height: 30 }}
                    content={
                      <Input
                        name="email"
                        error={Boolean(helperText("email"))}
                        value={registration["email"]}
                        onChange={handleFormChange("email")}
                        required
                        fullWidth
                      />
                    }
                  />
                  <AnalyticsComp
                    title="Password*"
                    direction="Vertical"
                    containerStyle={{ marginTop: 20, width: 300, height: 30 }}
                    content={
                      <Input
                        name="password"
                        error={Boolean(helperText("password"))}
                        value={registration["password"]}
                        onChange={handleFormChange("password")}
                        required
                        fullWidth
                      />
                    }
                  />
                </div>
                <div className={classes.namesContainer}>
                  <AnalyticsComp
                    title="FirstName"
                    direction="Vertical"
                    containerStyle={{ marginTop: 20, width: 300, height: 30 }}
                    content={
                      <Input
                        name="firstName"
                        error={Boolean(helperText("firstName"))}
                        value={registration["firstName"]}
                        onChange={handleFormChange("firstName")}
                        fullWidth
                      />
                    }
                  />

                  <AnalyticsComp
                    title="LastName"
                    direction="Vertical"
                    containerStyle={{ marginTop: 20, width: 300, height: 30 }}
                    content={
                      <Input
                        name="lastName"
                        error={Boolean(helperText("lastName"))}
                        value={registration["lastName"]}
                        onChange={handleFormChange("lastName")}
                        fullWidth
                      />
                    }
                  />

                  <AnalyticsComp
                    title="MiddleName"
                    direction="Vertical"
                    containerStyle={{ marginTop: 20, width: 300, height: 30 }}
                    content={
                      <Input
                        name="middleName"
                        error={Boolean(helperText("middleName"))}
                        value={registration["middleName"]}
                        onChange={handleFormChange("middleName")}
                        fullWidth
                      />
                    }
                  />
                </div>
                <div className={classes.emailMobileContainer}>
                  <AnalyticsComp
                    title="MobileNumber"
                    direction="Vertical"
                    containerStyle={{ marginTop: 20, width: 300, height: 30 }}
                    content={
                      <Input
                        name="mobileNumber"
                        error={Boolean(helperText("mobileNumber"))}
                        value={registration["mobileNumber"]}
                        onChange={handleFormChange("mobileNumber")}
                        fullWidth
                      />
                    }
                  />
                </div>
                <div className={classes.jobRoleContainer}>
                  <AnalyticsComp
                    title="JobTitle"
                    direction="Vertical"
                    containerStyle={{ marginTop: 20, width: 300, height: 30 }}
                    content={
                      <Input
                        name="jobTitle"
                        error={Boolean(helperText("jobTitle"))}
                        value={registration["jobTitle"]}
                        onChange={handleFormChange("jobTitle")}
                        fullWidth
                      />
                    }
                  />

                  <AnalyticsComp
                    title="Role"
                    direction="Vertical"
                    containerStyle={{ marginTop: 20, width: 300, height: 30 }}
                    content={
                      <Input
                        name="role"
                        error={Boolean(helperText("role"))}
                        value={registration["role"]}
                        onChange={handleFormChange("role")}
                        fullWidth
                      />
                    }
                  />
                </div>
              </div>
              <div className={classes.avatarField}>
                <AnalyticsTitle title="Photo" />
                {image ? (
                  <AvatarEditor
                    ref={avatarRef}
                    image={image}
                    width={width}
                    height={height}
                    border={border}
                    scale={scale}
                    position={position}
                    borderRadius={borderRadius}
                    rotate={rotate}
                    onPositionChange={(pos) =>
                      setAvatarProps((prev) => ({
                        ...prev,
                        position: pos,
                      }))
                    }
                  />
                ) : (
                  <Dropzone
                    onDrop={(files: File[]) => {
                      setAvatarProps((prev) => ({ ...prev, image: files[0] }));
                    }}
                    // noClick
                    noKeyboard
                    accept="image/*"
                    minSize={0}
                    maxSize={10485760}
                    multiple={false}
                  >
                    {({ getRootProps, getInputProps, isDragAccept }) => {
                      return (
                        <section className={classes.dndSection}>
                          <div
                            {...getRootProps()}
                            style={{
                              width: 400,
                              height: 400,
                              alignSelf: "center",
                            }}
                          >
                            <input {...getInputProps()} />
                            <div className={classes.dndArea}>
                              <CloudUploadIcon className={classes.imageDnD} />
                              <p>
                                Drag and Drop an image here or Browse an image
                                to upload
                              </p>
                            </div>
                          </div>
                        </section>
                      );
                    }}
                  </Dropzone>
                )}

                <AvatarControls
                  basePath={basePath}
                  updateParameterAction={updateAdminParameterAction}
                  avatarProps={avatarProps}
                  setAvatarProps={setAvatarProps}
                />
              </div>
            </div>
            <Button
              className={classes.button}
              type="submit"
              variant="contained"
              color="primary"
              // disabled={!isValid}
              fullWidth
            >
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SingleRegisterForm;
