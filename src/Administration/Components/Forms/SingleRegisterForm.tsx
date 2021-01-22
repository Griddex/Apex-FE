import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import ImageUploader from "react-images-upload";
import { useDispatch, useSelector } from "react-redux";
import AnalyticsTitle from "../../../Application/Components/Basic/AnalyticsTitle";
import ApexTextField from "../../../Application/Components/TextFields/ApexTextField";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { updateRegistrationFormAction } from "../../Redux/Actions/AdminActions";

const useStyles = makeStyles((theme) => ({
  root: { display: "flex", flexGrow: 1 },
  formFields: {
    display: "flex",
    flexGrow: 1,
    height: "100%",
    width: "70%",
  },
  avatarField: {
    display: "flex",
    flexGrow: 1,
    height: "100%",
    width: "30%",
  },
  namesContainer: {
    display: "flex",
    flexWrap: "wrap",
    // justifyContent: "center",
    height: 150,
    width: "100%",
  },
  emailMobileContainer: {
    display: "flex",
    flexWrap: "wrap",
    // justifyContent: "center",
    height: 100,
    width: "100%",
  },
  jobRoleContainer: {
    display: "flex",
    flexWrap: "wrap",
    // justifyContent: "center",
    height: 100,
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
  },
}));

const SingleRegisterForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { registrationScenario } = useSelector(
    (state: RootState) => state.adminReducer
  );

  return (
    <div className={classes.root}>
      <div className={classes.formFields}>
        <div className={classes.namesContainer}>
          <ApexTextField
            title="FirstName"
            textFieldName="firstName"
            apexAction={updateRegistrationFormAction}
          />
          <ApexTextField
            title="MiddleName"
            textFieldName="middleName"
            apexAction={updateRegistrationFormAction}
          />
          <ApexTextField
            title="LastName"
            textFieldName="lastName"
            apexAction={updateRegistrationFormAction}
          />
        </div>
        <div className={classes.emailMobileContainer}>
          <ApexTextField
            title="Email"
            textFieldName="email"
            apexAction={updateRegistrationFormAction}
          />
          <ApexTextField
            title="Mobile Number"
            textFieldName="mobileNumber"
            apexAction={updateRegistrationFormAction}
          />
        </div>
        <div className={classes.jobRoleContainer}>
          <ApexTextField
            title="Job Title"
            textFieldName="jobTitle"
            apexAction={updateRegistrationFormAction}
          />
          <ApexTextField
            title="Role"
            textFieldName="role"
            apexAction={updateRegistrationFormAction}
          />
        </div>
      </div>
      <div className={classes.avatarField}>
        <AnalyticsTitle title="Photo" />
        <ImageUploader
          withIcon={true}
          buttonText="Choose images"
          onChange={(files: File[], pictures: string[]) => {
            console.log(
              "Logged output --> ~ file: SingleRegisterForm.tsx ~ line 126 ~ SingleRegisterForm ~ pictures",
              pictures
            );
            console.log(
              "Logged output --> ~ file: SingleRegisterForm.tsx ~ line 126 ~ SingleRegisterForm ~ files",
              files
            );
          }}
          imgExtension={[".jpg", ".gif", ".png", "gif"]}
          maxFileSize={5242880}
          withPreview={true}
        />
      </div>
    </div>
  );
};

export default SingleRegisterForm;
