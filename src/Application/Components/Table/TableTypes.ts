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
