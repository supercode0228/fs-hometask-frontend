import React from 'react';
import {generatorRandomColor} from '../../../utils/helper';
import './UserCard.css';

export default function UserCard(props) {
  const {
    data,
    handleUserSelect,
  } = props;

  const {
    first_name,
    last_name,
    birthday,
    phone_number
  } = data;

  const colorStyle = {
    backgroundColor: generatorRandomColor()
  };

  return (
    <div
      className="user-card"
      onClick={() => handleUserSelect(data, colorStyle)}
    >
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
  )
}
