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
  registrationScenario?: "single" | "multiple";

  statusCode: number;
  data: any[];
  errors: string[];
  isAdmin: boolean;
  isAthenticated: boolean;
}
