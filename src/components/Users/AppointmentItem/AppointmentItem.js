import React from 'react';
import './AppointmentItem.css';

export default function AppointmentItem(props) {
  const { data } = props;
  const {
    start_date,
    start_time,
    appointment_type
  } = data
  return (
    <div className="user-appointment__item">
      <div className="user-appointment__item__time">
        {start_date}
        &nbsp;at&nbsp;
        {start_time}
      </div>
      <div className="user-appointment__item__type">
        {appointment_type}
      </div>
    </div>
  )
}
