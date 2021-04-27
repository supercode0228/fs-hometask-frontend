export const FETCH_APPOINTMENTS_BY_NAME = 'FETCH_APPOINTMENTS_BY_NAME';
export const FETCH_APPOINTMENTS_BY_NAME_SUCCESS = 'FETCH_APPOINTMENTS_BY_NAME_SUCCESS';
export const FETCH_APPOINTMENTS_BY_NAME_ERROR = 'FETCH_APPOINTMENTS_BY_NAME_ERROR';

function fetchAppointmentsByNamePending() {
  return {
    type: FETCH_APPOINTMENTS_BY_NAME,
  };
}

function fetchAppointmentsByNameSuccess(data, status) {
  return {
    type: FETCH_APPOINTMENTS_BY_NAME_SUCCESS,
    payload: data,
    status,
  };
}

function fetchAppointmentsByNameError(error, status) {
  return {
    type: FETCH_APPOINTMENTS_BY_NAME_ERROR,
    error,
    status,
  };
}

export const fetchAppointmentsByNameRequest = (patient_name) => (dispatch) => {
  dispatch(fetchAppointmentsByNamePending());

  fetch(`${process.env.REACT_APP_API_URL}/appointments/${patient_name}`)
    .then((res) => res.json())
    .then((result) => {
      const { status_code, status_msg, data } = result;
      if (status_code === 200 && status_msg === 'success') {
        dispatch(
          fetchAppointmentsByNameSuccess(data, {
            code: status_code,
            message: status_msg,
          })
        );
      } else {
        dispatch(
          fetchAppointmentsByNameError(
            { errMsg: status_msg },
            {
              code: status_code,
              message: status_msg,
            }
          )
        );
      }
    });
};