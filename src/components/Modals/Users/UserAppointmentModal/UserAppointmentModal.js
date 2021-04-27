import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppointmentItem from '../../../Users/AppointmentItem';
import { fetchAppointmentsByNameRequest } from '../../../../actions/appointment';
import {generatorRandomColor} from '../../../../utils/helper';

import './UserAppointmentModal.css';

export default function UserAppointmentModal(props) {
  const { user, toggleDetailModal } = props;

  const {
    first_name,
    last_name,
    birthday,
    phone_number
  } = user;

  const colorStyle = {
    backgroundColor: generatorRandomColor()
  };

  const [data, setData] = useState([]);

  // # Call Reducer
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointments);


  useEffect(() => {
    dispatch(fetchAppointmentsByNameRequest(first_name + ' ' + last_name));
  }, []);

  useEffect(() => {
    const { pending, status, data } = appointments;
    if (!pending) {
      if (status) {
        if (status.code === 200) {
          setData(data);
        }
      }
    }
  }, [appointments]);

  return (
    <div className="user-appointment-modal">
      <div className="user-appointment-modal__header">
        <div className="user-appointment-modal__header__left">
          <div>
            <div
              className="user-card__avatar"
              style={colorStyle}
            >
              {first_name.charAt(0)}
              {last_name.charAt(0)}
            </div>
          </div>
          <div className="user-card__info">
            <div className="user-card__info__fullname">
              {first_name}&nbsp;{last_name}
            </div>
            <div className="user-card__info__birthday">
              {birthday}
            </div>
            <div className="user-card__info__number">
              {phone_number}
            </div>
          </div>
        </div>
        <div className="user-appointment-modal__header__right">
          <div
            className="close-btn"
            onClick={toggleDetailModal}
          >
            <img
              src='../../../../assets/svgs/close-icon.svg'
              alt="close"
            />
          </div>
        </div>
      </div>
      <div className="user-appointment-modal__content">
        {data.map(data => (
          <AppointmentItem
            key={data.id}
            data={data}
          />
        ))}
      </div>
    </div>
  )
};
