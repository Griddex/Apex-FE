import { Dispatch, MiddlewareAPI } from "redux";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { updateEconomicsParameterAction } from "../Actions/EconomicsActions";

const economicsMiddleware =
  ({ dispatch, getState }: MiddlewareAPI) =>
  (next: Dispatch<IAction>) =>
  (action: IAction) => {
    const falsies = [null, undefined, false, ""];
    if (falsies.some((value) => value === action.meta)) return next(action);

    if (action.type === "PERSIST_ECONOMICSDECK") {
      if (action.meta) {
        const { workflowProcess, devValue, rows } = action.payload;
        if (action.meta.isRowsInPayload) {
          dispatch(
            updateEconomicsParameterAction(
              `inputDataWorkflows.${workflowProcess}.costsRevenues.${devValue}`,
              rows
            )
          );
        } else {
          const economicsState = getState().economicsReducer;
          const currentDeck =
            economicsState["inputDataWorkflows"][workflowProcess]["tableData"];
          const currentDevOption =
            economicsState["inputDataWorkflows"][workflowProcess][
              "currentDevOption"
            ];

          dispatch(
            updateEconomicsParameterAction(
              `inputDataWorkflows.${workflowProcess}.costsRevenues.${currentDevOption?.value}`,
              currentDeck
            )
          );
        }
      }
    }

    return next(action);
  };

export default economicsMiddleware;
