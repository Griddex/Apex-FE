export const SHOW_SPINNER = "SHOW_SPINNER";
export const HIDE_SPINNER = "HIDE_SPINNER";

export const showSpinnerAction = (message) => ({
  type: SHOW_SPINNER,
  payload: { pending: true, message },
});

export const hideSpinnerAction = () => ({
  type: HIDE_SPINNER,
  payload: { pending: false },
});
