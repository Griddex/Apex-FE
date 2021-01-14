import { makeStyles } from "@material-ui/core/styles";
import { Formik, FormikProps } from "formik";
import React from "react";
import * as Yup from "yup";
import networkState from "../../Redux/State/NetworkState";
import {
  ISaveNetworkProps,
  ISaveNetworkFormValues,
} from "../../Redux/State/NetworkStateTypes";

const useStyles = makeStyles(() => ({
  form: { height: "100%" },
}));

const SaveNetworkForm = ({ children }: ISaveNetworkProps) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={networkState}
      validationSchema={Yup.object().shape({
        networkName: Yup.string().required("networkName is required"),
        networkDescription: Yup.string().required(
          "networkDescription is required"
        ),
      })}
      onSubmit={() => {}}
    >
      {(props: FormikProps<ISaveNetworkFormValues>) => {
        const {
          values: { networkName, networkDescription },
          errors,
          touched,
          handleChange,
          isValid,
          handleSubmit,
        } = props;

        return (
          <form
            className={classes.form}
            onSubmit={handleSubmit}
            style={{ height: "100%", width: "100%" }}
          >
            {children &&
              children({
                networkName,
                networkDescription,
                errors,
                touched,
                handleChange,
                isValid,
              })}
          </form>
        );
      }}
    </Formik>
  );
};

export default SaveNetworkForm;
