import React, { useState } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
//import { useSnackbar } from 'notistack';

const DeleteAttendance = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();


  const handleDeleteAttendance = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/employeeattendances/${id}`)
      .then(() => {
        setLoading(false);
        navigate('/employeeattendances/showattendance');
      })
      .catch((error) => {
        setLoading(false);
         alert('An error happened. Please Chack console');
        console.log(error);
      });
  };
  
  return (
    <div className='p-4'>
      <BackButton destination='/employeeattendances/showattendance' /> 
      <h1 className='text-3xl my-4'>Delete Employee Attendence</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are You Sure You want to delete this Employee Attendence?</h3>

        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeleteAttendance}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  )
}

export default DeleteAttendance;