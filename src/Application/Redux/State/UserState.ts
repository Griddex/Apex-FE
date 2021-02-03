import { IUserState } from "./UserStateTypes";

const userState: IUserState = {
  //login
  userName: "",
  password: "",
  rememberMe: false,
  userId: "",
  token: "",

  //registration
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  mobileNumber: "",
  role: "Asset Forecaster",
  avatarUrl: "",

  statusCode: 0,
  data: [],
  errors: { message: "" },
  isAdmin: false,
  isAthenticated: false,
};

export default userState;
