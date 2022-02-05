import { TUseState } from "../../Types/ApplicationTypes";
import { TReducer } from "../Workflows/WorkflowTypes";

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
  isValid?: boolean;
  handleBlur?: (event: React.ChangeEvent<any>) => void;
  children?: (
    props: ITitleAndDescriptionFormProps
  ) => JSX.Element | JSX.Element[];
  reducer?: TReducer;
  storedTitles?: string[];
  isDialog?: boolean;
}
