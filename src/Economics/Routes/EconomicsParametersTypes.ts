import { IApprover } from "../../Application/Components/Approvers/ApproversTypes";
import { IAuthor } from "../../Application/Components/Author/AuthorTypes";

export type StatusTextType = "Approved" | "Pending" | "Returned" | string;

export interface IForecastDetail {
  titleName: string;
  statusText: StatusTextType;
  author: IAuthor;
  approvers?: IApprover;
  createdOn: Date;
  modifiedOn: Date;
}

export interface IEvent<T> {
  name?: string;
  value: T;
}
export interface IEconomicParameter {
  parameterName: string;
  parameterRuleAction: () => string;
  parameterValue: string | number;
  parameterUnits: Record<string, string>[];
  parameterUnitSelected: number;
  parameterRemark: string;
}
