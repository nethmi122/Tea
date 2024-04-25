import React, { useState } from 'react';
import BackButton from '../../components/BackButton';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteCustomer = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleDeleteCustomer = () =>
    {
        setLoading(true);
        axios
         .delete(`http://localhost:5555/customer_/${id}`)
         .then(() =>
         {
            setLoading(false);
            navigate('/customer_/home');
         })
         .catch((error) => {
            setLoading(false);
            alert('An error occurred. Please try again.');
            console.log( error);
        });
    };
    return(
        <div className='p-4'>
             <BackButton destination='/customer_/home' />
            <h1 className='text-3xl my-4'> Delete Customer</h1>
            {loading ? <Spinner /> : ''}

            <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mr-auto'>
                <h3 className='text-2xl'>Are you sure you want to delete this Customer?</h3>

                <button
                className='p-4 bg-red-600 text-white m-8 w-full'
                onClick={handleDeleteCustomer}

                >
                    Yes, Delete It
                </button>

            </div>
            </div>
    )
}

export default DeleteCustomer;