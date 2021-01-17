export const SHOW_SPINNER = "SHOW_SPINNER";
export const HIDE_SPINNER = "HIDE_SPINNER";

export const showSpinnerAction = (message: string) => ({
  type: SHOW_SPINNER,
  payload: { pending: true },
  meta: { message },
});

export const hideSpinnerAction = () => ({
  type: HIDE_SPINNER,
  payload: { pending: false },
});
