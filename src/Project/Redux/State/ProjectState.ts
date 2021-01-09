import { FormikErrors, FormikTouched } from "formik";

export interface INewProjectFormValues {
  projectName: string;
  projectDescription: string;
  dateFormat: string;
  pressureAddend: number;
}

export interface INewProjectWorkflowProps {
  activeStep?: number;
  projectName?: string;
  projectDescription?: string;
  dateFormat?: string;
  pressureAddend: number;
  errors?: FormikErrors<INewProjectFormValues>;
  touched?: FormikTouched<INewProjectFormValues>;
  isValid?: boolean;
  statusCode?: string;
  result?: string;
  handleChange?: (event: React.ChangeEvent<any>) => void;
}

export interface INewProjectFormProps {
  actionsList?: () => JSX.Element | JSX.Element[];
  children?:
    | ((props: INewProjectWorkflowProps) => JSX.Element)
    | ((props: INewProjectWorkflowProps) => JSX.Element[]);
}

const newProjectState: INewProjectFormValues = {
  projectName: "",
  projectDescription: "",
  dateFormat: "",
  pressureAddend: 14.7,
};

export default newProjectState;
