import { get } from 'lodash';
import { call, put, takeEvery } from 'redux-saga/effects';
import actionsTypes from '../actions/actionTypes';
import { post as postAPI } from '../api';
import { authenticate, onError } from '../reducers/auth';
import { buildAuthConfig, setLocalConfig } from '../utils';

export function* initAuthentication(action: any): any {
  try {
    const request = buildAuthConfig(get(action, 'payload', {}));
    const url = get(request, 'endpoint', '');
    const data = get(request, 'data', {});
    const response = yield call(() => postAPI(url, data));
    setLocalConfig(response?.data);
    yield put(authenticate(response?.data));
  } catch (e) {
    yield put(onError('Incorrect credentials'));
  }
}

export default function* rootSaga() {
  yield takeEvery(actionsTypes.AUTHENTICATE, initAuthentication);
}
