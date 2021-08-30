import { IAdminState } from "./AdminStateTypes";

const adminState = {
  loadAdminWorkflow: false,

  avatarStoreProps: {
    image: "",
    width: 400,
    height: 400,
    scale: 1.2,
    position: { x: 0.5, y: 0.5 },
    borderRadius: 1,
    border: 50,
    rotate: 0,
  },
} as IAdminState;

export default adminState;
