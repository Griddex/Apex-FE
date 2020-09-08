import { showSpinnerAction } from "./../Actions/UISpinnerActions";

const uiSpinnerMiddleware = ({ dispatch }) => (next) => (action) => {
  const falsies = [null, undefined, false, ""];
  if (falsies.some((value) => value === action.meta)) return next(action);

  if (action.meta.showSpinner) {
    dispatch(showSpinnerAction(action.meta.message));
  }

  return next(action);
};

export default uiSpinnerMiddleware;
