export interface IRegistrationFormValues {
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
}
