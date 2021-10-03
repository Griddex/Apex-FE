import { IUserDetails } from "../User/UserTypes";
import { CSSProperties } from "react";

export interface IAuthor extends IUserDetails {
  authorStyles?: CSSProperties;
}

export type AuthorType = IAuthor | string | undefined;
