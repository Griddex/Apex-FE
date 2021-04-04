import { ILayoutState } from "./LayoutStateTypes";

const layoutState: ILayoutState = {
  showMainDrawer: true,
  expandMainDrawer: false,
  mainDrawertext: "",
  menusDisabled: true, //Change to true later

  showNavbar: true,
  expandNavbar: false,

  showContextDrawer: false,
  expandContextDrawer: false,

  showDialogContextDrawer: true,
  expandDialogContextDrawer: false,

  showSubNavbar: true,
  expandSubNavbar: false,

  isLoggedOut: false,

  loadWorkflow: false,

  simpleDialogOpen: false,
};

export default layoutState;
