export interface IUserState {
  //login
  userName: string;
  password: string;
  rememberMe?: boolean;
  userId?: string;
  token?: string;

  //registration
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  mobileNumber?: string;
  jobTitle?: string;
  role: "Admin" | "Corporate Forecaster" | "Asset Forecaster" | "Economist";
  avatarUrl?: string;
  registrationScenario?: "single" | "multiple";

  status: number;
  data: any[];
  errors: { message: string };
  isAdmin: boolean;
  isAthenticated: boolean;
}
