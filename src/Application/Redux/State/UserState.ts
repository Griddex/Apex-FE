import { IUserState } from "./UserStateTypes";

const userState: IUserState = {
  //login
  userName: "",
  password: "",
  rememberMe: false,
  token: "",

  //registration
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  mobileNumber: "",
  role: "",
  avatarUrl: "",

  statusCode: 0,
  data: [],
  errors: [],
  isAdmin: false,
  isAthenticated: false,
};

export default userState;
