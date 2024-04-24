import React, {useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowEmployee = () => {
    const [employee, setEmployee] = useState({});
    const [loading, setLoading]=useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/employees/${id}`)
        .then((response) => {
            setEmployee(response.data);
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
        });
    }, [])
    return(
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Show Employee</h1>
            {loading ?(
                <Spinner />
            ) : (
                <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
                    <div className='my-4'>
                        <span className = 'text-xl mr-4 text-gray-500'>Emp_ID</span>
                        <span>{employee.Emp_ID}</span>
                    </div>

                    <div className='my-4'>
                        <span className = 'text-xl mr-4 text-gray-500'>Name</span>
                        <span>{employee.Name}</span>
                    </div>

                    <div className='my-4'>
                        <span className = 'text-xl mr-4 text-gray-500'>Age</span>
                        <span>{employee.Age}</span>
                    </div>
                    
                    <div className='my-4'>
                        <span className = 'text-xl mr-4 text-gray-500'>Job_Role</span>
                        <span>{employee.Job_Role}</span>
                    </div>

                    <div className='my-4'>
                        <span className = 'text-xl mr-4 text-gray-500'>Contact_No</span>
                        <span>{employee.Contact_No}</span>
                    </div>

                    <div className='my-4'>
                        <span className = 'text-xl mr-4 text-gray-500'>Create Time</span>
                        <span>{new Date(employee.updatedAt).toString()}</span>
                    </div>

                    <div className='my-4'>
                        <span className = 'text-xl mr-4 text-gray-500'>Last Updated Time</span>
                        <span>{new Date(employee.updatedAt).toString()}</span>
                    </div>

                    </div>
            )}
            </div>
    )
}

export default ShowEmployee