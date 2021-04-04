export interface ILayoutState {
  showMainDrawer: boolean;
  expandMainDrawer: boolean;
  mainDrawertext: string;
  menusDisabled: boolean;

  showNavbar: boolean;
  expandNavbar: boolean;

  showContextDrawer: boolean;
  expandContextDrawer: boolean;

  showDialogContextDrawer: boolean;
  expandDialogContextDrawer: boolean;

  showSubNavbar: boolean;
  expandSubNavbar: boolean;

  isLoggedOut: boolean;

  loadWorkflow: boolean;

  simpleDialogOpen: boolean;
}
