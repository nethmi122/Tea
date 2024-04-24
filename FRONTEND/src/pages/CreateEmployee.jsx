import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateEmployee = () => {
    const [Emp_ID, setEmpID] = useState('');
    const [Name, setName] = useState('');
    const [Age, setAge] = useState('');
    const [Job_Role, setJobRole] = useState('');
    const [Contact_No, setContact_No] = useState('');
    const [Salary, setSalary] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSaveEmployee = () => {
        const data = {
            Emp_ID,
            Name,
            Age,
            Job_Role,
            Contact_No,
            Salary,
        };
        setLoading(true);
        axios
            .post(`http://localhost:5555/employees`, data)
            .then(() => {
                setLoading(false);
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                setErrorMessage('An error occurred while saving the employee. Please try again.');
                console.error('An error occurred:', error);
            });
    };

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Create Employee</h1>
            {loading && <Spinner />}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Emp_ID</label>
                    <input 
                        type='number'
                        value={Emp_ID}
                        onChange={(e) => setEmpID(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>

                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Name</label>
                    <input 
                        type='text'
                        value={Name}
                        onChange={(e) => setName(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>

                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Age</label>
                    <input 
                        type='number'
                        value={Age}
                        onChange={(e) => setAge(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>

                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Job Role</label>
                    <input 
                        type='text'
                        value={Job_Role}
                        onChange={(e) => setJobRole(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>

                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Contact No</label>
                    <input 
                        type='number'
                        value={Contact_No}
                        onChange={(e) => setContact_No(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>

                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Salary</label>
                    <input 
                        type='number'
                        value={Salary}
                        onChange={(e) => setSalary(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>

                <div>
                    <button className='p-2 bg-sky-300 m-8' onClick={handleSaveEmployee}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateEmployee;
