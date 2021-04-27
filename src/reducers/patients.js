import {
  FETCH_PATIENTS,
  FETCH_PATIENTS_SUCCESS,
  FETCH_PATIENTS_ERROR
} from '../actions/patient';

import initialState from './initialState';

export function patientsReducer(state = initialState.patients, action) {
  switch (action.type) {
    case FETCH_PATIENTS:
      return {
        ...state,
        pending: true,
      };
    case FETCH_PATIENTS_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.payload,
        error: null,
        status: action.status,
      };
    case FETCH_PATIENTS_ERROR:
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

