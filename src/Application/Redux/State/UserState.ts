import { IUserState } from "./UserStateTypes";

const userState: IUserState = {
  //login
  userId: "",
  userName: "",
  password: "",
  email: "",
  rememberMe: false,

  //registration
  firstName: "",
  middleName: "",
  lastName: "",
  mobileNumber: "",
  role: "Asset Forecaster",
  avatarUrl: "",

  status: 0,
  data: [],
  errors: { message: "" },
  isAdmin: false,
  isAthenticated: false,
};

export default userState;
