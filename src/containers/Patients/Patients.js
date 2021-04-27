import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import UserCard from '../../components/Users/UserCard';
import StaticModal from '../../components/Common/StaticModal';
import UserAppointmentModal from '../../components/Modals/Users/UserAppointmentModal';

import { fetchPatientsRequest } from '../../actions/patient';

import './Patients.css';

export default function Patients() {

  // # Define state
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [data, setData] = useState([]);

  // # Call Reducer
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patients);

  useEffect(() => {
    dispatch(fetchPatientsRequest());
  }, []);

  useEffect(() => {
    const { pending, status, data } = patients;
    if (!pending) {
      if (status) {
        if (status.code === 200) {
          setData(data);
        }
      }
    }
  }, [patients]);

  const toggleDetailModal = () => {
    setOpenDetailModal(!openDetailModal);
  };

  const handleUserSelect = (data) => {
    setSelectedUser(data);
    toggleDetailModal();
  }

  const renderDetailModal = () => {
    if (!openDetailModal) return null;

    return (
      <StaticModal
        content={
          <UserAppointmentModal
            user={selectedUser}
            toggleDetailModal={toggleDetailModal}
          />
        }
        close={toggleDetailModal}
      />
    );
  };

  return (
    <div className="users">
      <h1 className="users__header">Users</h1>
      <div className="users__list">
        {data.map(item => (
          <UserCard
            key={item.id}
            data={item}
            handleUserSelect={handleUserSelect}
            toggleDetailModal={toggleDetailModal}
          />
        ))}
      </div>
      {renderDetailModal()}
    </div>
  )
}
