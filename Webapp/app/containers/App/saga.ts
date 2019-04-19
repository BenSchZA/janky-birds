import {fork} from 'redux-saga/effects';

import AuthSaga from '../../domain/authentication/saga';
import TransactionManagementSaga from '../../domain/transactionManagement/saga';

export default function * root() {
  // Add other global DAEMON sagas here.
  // To prevent performance bottlenecks add sagas with caution.

  yield fork(TransactionManagementSaga);

  yield fork(AuthSaga);

}
