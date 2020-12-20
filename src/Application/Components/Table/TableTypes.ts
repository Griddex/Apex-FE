import { Column } from "react-data-griddex";

export interface ITableRoles {
  i: string;
  roleNames: string[];
  roleColors: string[];
}

export type RoleNumberType = number;

export interface ITableRolesProps {
  rolesProps?: ITableRoles;
  roleNumber?: RoleNumberType;
}

export type ColumnType = readonly Column<Record<string, React.Key>, unknown>[];
export type RowType = Record<string, React.Key>;
export type RowsType = RowType[];
