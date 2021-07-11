import { FormikErrors, FormikTouched } from "formik";
import { TUseState } from "../../Types/ApplicationTypes";
import { ReducersType } from "../Workflows/WorkflowTypes";

export interface ITitleAndDescriptionFormValues {
  title?: string;
  description?: string;
}

export interface ITitleAndDescriptionFormProps
  extends ITitleAndDescriptionFormValues {
  setTitle?: TUseState<string>;
  setDescription?: TUseState<string>;
  setDisable?: TUseState<boolean>;
  activeStep?: number;
  // errors?: FormikErrors<ITitleAndDescriptionFormValues>;
  // touched?: FormikTouched<ITitleAndDescriptionFormValues>;
  // setFieldTouched?: (
  //   field: string,
  //   isTouched?: boolean,
  //   shouldValidate?: boolean
  // ) => void;
  isValid?: boolean;
  handleBlur?: (event: React.ChangeEvent<any>) => void;
  children?: (
    props: ITitleAndDescriptionFormProps
  ) => JSX.Element | JSX.Element[];
  reducer?: ReducersType;
  storedTitles?: string[];
}
