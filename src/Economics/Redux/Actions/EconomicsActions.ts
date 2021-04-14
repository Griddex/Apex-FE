export const LOAD_ECONOMICS_WORKFLOW = "LOAD_ECONOMICS_WORKFLOW";
export const UPDATE_ECONOMICS = "UPDATE_ECONOMICS";
export const EXISTINGCOSTSREVENUESDATA_REQUEST =
  "EXISTINGCOSTSREVENUESDATA_REQUEST";
export const EXISTINGCOSTSREVENUESDATA_SUCCESS =
  "EXISTINGCOSTSREVENUESDATA_SUCCESS";
export const EXISTINGCOSTSREVENUESDATA_FAILURE =
  "EXISTINGCOSTSREVENUESDATA_FAILURE";
export const SAVECOSTSREVENUES_REQUEST = "SAVECOSTSREVENUES_REQUEST";
export const SAVECOSTSREVENUES_SUCCESS = "SAVECOSTSREVENUES_SUCCESS";
export const SAVECOSTSREVENUES_FAILURE = "SAVECOSTSREVENUES_FAILURE";

export const updateEconomicsParameterAction = (
  path: string,
  value: React.Key
) => {
  return {
    type: UPDATE_ECONOMICS,
    payload: {
      path,
      value,
    },
  };
};

export const loadEconomicsWorkflowAction = (name: string) => {
  return {
    type: LOAD_ECONOMICS_WORKFLOW,
    payload: {
      name,
    },
  };
};

export const fetchExistingCostsRevenuesDataRequestAction = () => {
  return {
    type: EXISTINGCOSTSREVENUESDATA_REQUEST,
  };
};

export const fetchExistingCostsRevenuesDataSuccessAction = () => {
  return {
    type: EXISTINGCOSTSREVENUESDATA_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const fetchExistingCostsRevenuesDataFailureAction = () => {
  return {
    type: EXISTINGCOSTSREVENUESDATA_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const saveCostsRevenuesRequestAction = () => {
  return {
    type: SAVECOSTSREVENUES_REQUEST,
    meta: { showSpinner: true, message: "Saving costs & revenues..." },
  };
};

export const saveCostsRevenuesSuccessAction = () => {
  return {
    type: SAVECOSTSREVENUES_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const saveCostsRevenuesFailureAction = () => {
  return {
    type: SAVECOSTSREVENUES_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};
