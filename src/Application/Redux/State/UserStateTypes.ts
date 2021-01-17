export interface IUserState {
  //login
  userName: string;
  password: string;
  rememberMe?: boolean;
  token?: string;

  //registration
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  mobileNumber?: string;
  jobTitle?: string;
  role:
    | ""
    | "Admin"
    | "Corporate Forecaster"
    | "Asset Forecaster"
    | "Economist";
  avatarUrl?: string;

  statusCode: string;
  result: string;
  errors: string[];
  isAdmin: boolean;
  isAthenticated: boolean;
}
