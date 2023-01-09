import { call, put, takeLatest, all } from "redux-saga/effects";

// eslint-disable-next-line import/no-cycle
import AuthService from "@/services/api/auth-service";
import storage from "@/utils/storage";

import { getUserProfile } from "./actions";

function* getUserProfileTask() {
  try {
    const profile = yield call([AuthService, AuthService.getProfile]);
    yield put(getUserProfile.success(profile));
  } catch (error) {
    if (
      error?.status === 401 ||
      error?.message?.toLowerCase() === "user not found"
    ) {
      storage.clear();
    }
    yield put(getUserProfile.failure());
  }
}

export default function* globalSaga() {
  yield all([takeLatest(getUserProfile.request, getUserProfileTask)]);
}
