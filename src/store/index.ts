import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import authReducer from '../reducers/auth';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).prepend(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
