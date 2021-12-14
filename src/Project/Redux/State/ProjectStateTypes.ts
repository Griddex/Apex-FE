import { FormikErrors, FormikTouched } from "formik";
import { CSSProperties } from "react";
import { IUserDetails } from "../../../Application/Components/User/UserTypes";

export interface IApplicationProject {
  sn?: number;
  id?: string;
  title?: string;
  description?: string;
  author: IUserDetails | string;
  approvers: IUserDetails[] | string;
  createdAt?: string;
}
export interface IProject {
  sn?: number;
  projectId?: string;
  projectTitle?: string;
  projectDescription?: string;
  author?: IUserDetails | string;
  approvers?: IUserDetails[] | string;
  createdOn?: string;
  modifiedOn?: string;

  icon?: JSX.Element;
  handleClick?: () => void;
  toggleSN?: boolean;
  style?: CSSProperties;
  recentProjectsStyles?: CSSProperties;
}

export interface IProjectState extends INewProjectFormValues {
  projectId: string;

  selectedProjectId: string;
  selectedProjectTitle: string;
  selectedProjectDescription: string;

  currentProjectId: string;
  currentProjectTitle: string;
  currentProjectDescription: string;

  storedProjects: IProject[];
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
