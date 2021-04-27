export const FETCH_PATIENTS = 'FETCH_PATIENTS';
export const FETCH_PATIENTS_SUCCESS = 'FETCH_PATIENTS_SUCCESS';
export const FETCH_PATIENTS_ERROR = 'FETCH_PATIENTS_ERROR';

function fetchPatientsPending() {
  return {
    type: FETCH_PATIENTS,
  };
}

function fetchPatientsSuccess(data, status) {
  return {
    type: FETCH_PATIENTS_SUCCESS,
    payload: data,
    status,
  };
}

function fetchPatientsError(error, status) {
  return {
    type: FETCH_PATIENTS_ERROR,
    error,
    status,
  };
}

export const fetchPatientsRequest = () => (dispatch) => {
  dispatch(fetchPatientsPending());

  fetch(`${process.env.REACT_APP_API_URL}/patients`)
    .then((res) => res.json())
    .then((result) => {
      const { status_code, status_msg, data } = result;
      if (status_code === 200 && status_msg === 'success') {
        dispatch(
          fetchPatientsSuccess(data, {
            code: status_code,
            message: status_msg,
          })
        );
      } else {
        dispatch(
          fetchPatientsError(
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