import { FormikErrors, FormikTouched } from "formik";

export interface IRecentProject {
  sn?: number;
  projectId?: string;
  projectTitle?: string;
  projectDescription?: string;
  icon?: JSX.Element;
  handleClick?: () => void;
  toggleSN?: boolean;
}

export interface IProjectState extends INewProjectFormValues {
  projectId: string;
  recentProjects: IRecentProject[];
}

export interface INewProjectFormValues {
  projectTitle: string;
  projectDescription: string;
  pressureAddend: number;
}

export interface INewProjectWorkflowProps
  extends Partial<INewProjectFormValues> {
  activeStep?: number;
  errors?: FormikErrors<INewProjectFormValues>;
  touched?: FormikTouched<INewProjectFormValues>;
  isValid?: boolean;
  handleChange?: (event: React.ChangeEvent<any>) => void;
}

export interface INewProjectFormProps {
  actionsList?: () => JSX.Element | JSX.Element[];
  children?:
    | ((props: INewProjectWorkflowProps) => JSX.Element)
    | ((props: INewProjectWorkflowProps) => JSX.Element[]);
}
