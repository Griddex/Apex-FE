import { ILayoutState } from "./LayoutStateTypes";

const layoutState: ILayoutState = {
  showMainDrawer: true,
  expandMainDrawer: false,
  mainDrawertext: "",
  menusDisabled: true,

  showNavbar: true,
  expandNavbar: false,

  showContextDrawer: false,
  expandContextDrawer: false,

  showSubNavbar: true,
  expandSubNavbar: false,

  isLoggedOut: false,

  loadWorkflow: false,

  simpleDialogOpen: false,
};

export default layoutState;
