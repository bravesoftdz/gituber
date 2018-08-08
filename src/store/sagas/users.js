import { call, put, select } from 'redux-saga/effects';
import api from '../../services/api';

import { Creators as UsersActions } from '../ducks/users';
import { Creators as ToastsActions, Types as ToastTypes } from '../ducks/toasts';

export function* addUser(action) {
  try {
    const { data } = yield call(api.get, `/users/${action.payload.username}`);

    const isDuplicated = yield select(state => state.users.data.find(user => user.id === data.id));
    if (isDuplicated) {
      yield put(UsersActions.addUserFailure('Usuário duplicado'));
    } else {
      const user = {
        id: data.id,
        avatar_url: data.avatar_url,
        name: data.name,
        login: data.login,
        html_url: data.html_url,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
      };

      yield put(UsersActions.addUserSuccess(user));
      yield put({
        type: ToastTypes.SHOW_TOAST,
        toast: ToastsActions.buildToast('Usuário adicionado com sucesso', ToastTypes.SUCCESS),
      });
    }
  } catch (err) {
    yield put(UsersActions.addUserFailure('Erro ao cadastrar novo usuário'));
    yield put({
      type: ToastTypes.SHOW_TOAST,
      toast: ToastsActions.buildToast('Erro ao cadastrar novo usuário', ToastTypes.ERROR),
    });
  }
}
