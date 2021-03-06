import { ApprovalTextType } from "../../../../Application/Components/Approval/ApprovalTypes";
import { IApprover } from "../../../../Application/Components/Approvers/ApproversTypes";
import { IAuthor } from "../../../../Application/Components/Author/AuthorTypes";

export interface IForecastDetail {
  titleName: string;
  approvalText: ApprovalTextType;
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
