import {
  IAllWorkflowProcesses,
  ReducersType,
} from "../../../Application/Components/Workflows/WorkflowTypes";

export const LOAD_ECONOMICS_WORKFLOW = "LOAD_ECONOMICS_WORKFLOW";
export const UPDATE_ECONOMICS = "UPDATE_ECONOMICS";
export const EXISTINGCOSTSREVENUESDATA_REQUEST =
  "EXISTINGCOSTSREVENUESDATA_REQUEST";
export const EXISTINGCOSTSREVENUESDATA_SUCCESS =
  "EXISTINGCOSTSREVENUESDATA_SUCCESS";
export const EXISTINGCOSTSREVENUESDATA_FAILURE =
  "EXISTINGCOSTSREVENUESDATA_FAILURE";
export const EXISTINGECONOMICSPARAMETERSDATA_REQUEST =
  "EXISTINGECONOMICSPARAMETERSDATA_REQUEST";
export const EXISTINGECONOMICSPARAMETERSDATA_SUCCESS =
  "EXISTINGECONOMICSPARAMETERSDATA_SUCCESS";
export const EXISTINGECONOMICSPARAMETERSDATA_FAILURE =
  "EXISTINGECONOMICSPARAMETERSDATA_FAILURE";
export const SAVECOSTSREVENUES_REQUEST = "SAVECOSTSREVENUES_REQUEST";
export const SAVECOSTSREVENUES_SUCCESS = "SAVECOSTSREVENUES_SUCCESS";
export const SAVECOSTSREVENUES_FAILURE = "SAVECOSTSREVENUES_FAILURE";
export const SAVEECONOMICSPARAMETERS_REQUEST =
  "SAVEECONOMICSPARAMETERS_REQUEST";
export const SAVEECONOMICSPARAMETERS_SUCCESS =
  "SAVEECONOMICSPARAMETERS_SUCCESS";
export const SAVEECONOMICSPARAMETERS_FAILURE =
  "SAVEECONOMICSPARAMETERS_FAILURE";
export const FETCHCOSTSREVENUESHEADERS_REQUEST =
  "FETCHCOSTSREVENUESHEADERS_REQUEST";
export const FETCHCOSTSREVENUESHEADERS_SUCCESS =
  "FETCHCOSTSREVENUESHEADERS_SUCCESS";
export const FETCHCOSTSREVENUESHEADERS_FAILURE =
  "FETCHCOSTSREVENUESHEADERS_FAILURE";
export const FETCHECONOMICSPARAMETERSHEADERS_REQUEST =
  "FETCHECONOMICSPARAMETERSHEADERS_REQUEST";
export const FETCHECONOMICSPARAMETERSHEADERS_SUCCESS =
  "FETCHECONOMICSPARAMETERSHEADERS_SUCCESS";
export const FETCHECONOMICSPARAMETERSHEADERS_FAILURE =
  "FETCHECONOMICSPARAMETERSHEADERS_FAILURE";
export const EXISTINGECONOMICSDATA_REQUEST = "EXISTINGECONOMICSDATA_REQUEST";
export const EXISTINGECONOMICSDATA_SUCCESS = "EXISTINGECONOMICSDATA_SUCCESS";
export const EXISTINGECONOMICSDATA_FAILURE = "EXISTINGECONOMICSDATA_FAILURE";

export const updateEconomicsParameterAction = (
  path: string,
  value: React.Key | boolean
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

export const fetchExistingCostsRevenuesHeadersRequestAction = () => {
  return {
    type: FETCHCOSTSREVENUESHEADERS_REQUEST,
  };
};

export const fetchExistingCostsRevenuesHeadersSuccessAction = () => {
  return {
    type: FETCHCOSTSREVENUESHEADERS_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const fetchExistingCostsRevenuesDataFailureAction = () => {
  return {
    type: FETCHCOSTSREVENUESHEADERS_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const saveCostsRevenuesRequestAction = (
  workflowProcess: IAllWorkflowProcesses["wrkflwPrcss"],
  reducer: ReducersType
) => {
  return {
    type: SAVECOSTSREVENUES_REQUEST,
    payload: { workflowProcess, reducer },
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

export const fetchExistingEconomicsParametersDataRequestAction = () => {
  return {
    type: FETCHECONOMICSPARAMETERSHEADERS_REQUEST,
  };
};

export const fetchExistingEconomicsParametersHeadersSuccessAction = () => {
  return {
    type: FETCHECONOMICSPARAMETERSHEADERS_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const fetchExistingEconomicsParametersDataFailureAction = () => {
  return {
    type: FETCHECONOMICSPARAMETERSHEADERS_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const saveEconomicsParametersRequestAction = () => {
  return {
    type: SAVEECONOMICSPARAMETERS_REQUEST,
    meta: { showSpinner: true, message: "Saving economics parameters..." },
  };
};

export const saveEconomicsParametersSuccessAction = () => {
  return {
    type: SAVEECONOMICSPARAMETERS_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const saveEconomicsParametersFailureAction = () => {
  return {
    type: SAVEECONOMICSPARAMETERS_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const fetchExistingEconomicsDataRequestAction = (projectId: string) => {
  return {
    type: EXISTINGECONOMICSDATA_REQUEST,
    payload: { projectId },
    meta: { showSpinner: true, message: "Loading economics data..." },
  };
};

export const fetchExistingEconomicsDataSuccessAction = () => {
  return {
    type: EXISTINGECONOMICSDATA_SUCCESS,
    payload: { facilitiesInputDeckExisting: [], forecastInputDeckExisting: [] },
  };
};

export const fetchExistingEconomicsDataFailureAction = () => {
  return {
    type: EXISTINGECONOMICSDATA_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};
