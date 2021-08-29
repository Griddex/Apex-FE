import { IUserState } from "./UserStateTypes";

export const userState: Partial<IUserState> = {
  userName: "",
  password: "",
  email: "",
  rememberMe: false,

  firstName: "",
  middleName: "",
  lastName: "",
  mobileNumber: "",
  role: "Asset Forecaster",
  avatarUrl: "",
};

export const userMetaState: Partial<IUserState> = {
  userId: "",
  status: 0,
  data: [],
  errors: { message: "" },
  isAdmin: false,
  isAthenticated: false,
};

export default { ...userMetaState, ...userState };
