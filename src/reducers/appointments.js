import {
  FETCH_APPOINTMENTS_BY_NAME,
  FETCH_APPOINTMENTS_BY_NAME_SUCCESS,
  FETCH_APPOINTMENTS_BY_NAME_ERROR
} from '../actions/appointment';

import initialState from './initialState';

export function appointmentsReducer(state = initialState.appointments, action) {
  switch (action.type) {
    case FETCH_APPOINTMENTS_BY_NAME:
      return {
        ...state,
        pending: true,
      };
    case FETCH_APPOINTMENTS_BY_NAME_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.payload,
        error: null,
        status: action.status,
      };
    case FETCH_APPOINTMENTS_BY_NAME_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
        data: [],
        status: action.status,
      };
    default:
      return state;
  }
}

