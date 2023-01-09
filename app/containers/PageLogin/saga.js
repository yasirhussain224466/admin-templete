import { call, put, takeLatest, all } from "redux-saga/effects";
import { push } from "connected-react-router";

import AuthService from "@/services/api/auth-service";
import { setTokens } from "@/utils/auth";
import { updateGlobalKey } from "@/redux/global/actions";
import storage from "@/utils/storage";
import NotificationStatus from "@/components/Notification";

import { login } from "./actions";

function* loginTask({ payload }) {
  try {
    const data = yield call([AuthService, AuthService.login], payload) || {};
    if (!data?.access_token && !data?.is_password_saved) {
      NotificationStatus("success", data?.message);
    }
    if (data && data?.access_token && data?.refresh_token) {
      yield put(login.success());
      setTokens({
        access_token: data?.access_token,
        refresh_token: data?.refresh_token,
      });
      yield put(updateGlobalKey());
      let path = "";
      if (storage.get("path")) path = JSON.parse(storage.get("path"));
      if (path) {
        yield put(push(path));
      } else {
        yield put(push("/"));
      }
    }
  } catch (error) {
    yield put(login.failure(error));
  }
}

export default function* loginSaga() {
  yield all([takeLatest(login.request, loginTask)]);
}
