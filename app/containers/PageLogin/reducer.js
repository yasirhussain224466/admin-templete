import produce from "immer";

import { handleActions } from "@/utils/redux-actions";

import { login } from "./actions";

const initialState = {
  errors: null,
  loading: false,
};

export default handleActions(
  {
    [login.success]: produce((draft) => {
      draft.errors = initialState.error;
      draft.loading = false;
    }),
    [login.failure]: produce((draft, { payload }) => {
      draft.errors = payload;
      draft.loading = false;
    }),
    [login.request]: produce((draft, { payload }) => {
      draft.errors = payload;
      draft.loading = true;
    }),
  },
  initialState,
);
