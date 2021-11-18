export const UPDATE_ADMIN = "UPDATE_ADMIN";
export const UPDATE_ADMINS = "UPDATE_ADMINS";
export const LOAD_ADMIN_WORKFLOW = "LOAD_ADMIN_WORKFLOW";
export const RESET_ADMIN = "RESET_ADMIN";

export const updateAdminParameterAction = (path: string, value: any) => {
  return {
    type: UPDATE_ADMINS,
    payload: { path, value },
  };
};

export const updateAdminsParameterAction = (updateObj: Record<string, any>) => {
  return {
    type: UPDATE_ADMIN,
    payload: {
      updateObj,
    },
  };
};

export const loadAdminWorkflowAction = (name: string, trueOrFalse: boolean) => {
  return {
    type: LOAD_ADMIN_WORKFLOW,
    payload: {
      name,
      trueOrFalse,
    },
  };
};

export const resetAdminAction = () => {
  return {
    type: RESET_ADMIN,
  };
};
