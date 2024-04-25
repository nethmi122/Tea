import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployee = () => {
    const [Emp_ID, setEmpID] = useState('');
    const [Name, setName] = useState('');
    const [Age, setAge] = useState('');
    const [Job_Role, setJobRole] = useState('');
    const [Contact_No, setContact_No] = useState('');
    const [Salary, setSalary] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/employees/${id}`)
            .then((response) => {
                setEmpID(response.data.Emp_ID);
                setName(response.data.Name);
                setAge(response.data.Age);
                setJobRole(response.data.Job_Role);
                setContact_No(response.data.Contact_No);
                setSalary(response.data.Salary);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                alert('An error occurred while fetching employee details. Please try again.');
                console.log(error);
            });
    }, []);

    const validateName = (name) => {
        // Validate that Name contains only alphabetical characters
        return /^[a-zA-Z]+$/.test(name);
    };

    const validateAge = (age) => {
        // Validate that Age is a positive integer
        return age >= 0;
    };

    const validateContactNo = (contactNo) => {
        // Validate that Contact_No has 10 digits and starts with 0
        return /^0\d{9}$/.test(contactNo);
    };

    const validateSalary = (salary) => {
        // Validate that Salary is a positive number
        return salary >= 0;
    };

    const handleEditEmployee = () => {
        if (!validateName(Name)) {
            setErrorMessage('Name must contain only alphabetical characters.');
            return;
        }

        if (!validateAge(Age)) {
            setErrorMessage('Age must be a non-negative integer.');
            return;
        }

        if (!validateContactNo(Contact_No)) {
            setErrorMessage('Contact number must have 10 digits and start with 0.');
            return;
        }

        if (!validateSalary(Salary)) {
            setErrorMessage('Salary must be a non-negative number.');
            return;
        }

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
            .put(`http://localhost:5555/employees/${id}`, data)
            .then(() => {
                setLoading(false);
                navigate('/employees/emphome');
            })
            .catch((error) => {
                setLoading(false);
                alert('An error occurred while editing the employee. Please try again.');
                console.log(error);
            });
    };

    return (
        <div className='p-4'>
            <BackButton destination='/employees/emphome' />
            <h1 className='text-3xl my-4'>Edit Employee</h1>
            {loading && <Spinner />}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            <div style={{ backgroundColor: '#f0f0f0' }}>
                <div style={{ border: '2px solid #3182ce', borderRadius: '8px', width: '600px', margin: 'auto', padding: '16px' }}>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ fontSize: '1.5rem', marginRight: '8px', color: '#4a5568' }}>Emp_ID</label>
                        <input
                            type='number'
                            value={Emp_ID}
                            onChange={(e) => setEmpID(e.target.value)}
                            style={{ border: '2px solid #a0aec0', padding: '8px', width: '100%' }}
                        />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ fontSize: '1.5rem', marginRight: '8px', color: '#4a5568' }}>Name</label>
                        <input
                            type='text'
                            value={Name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ border: '2px solid #a0aec0', padding: '8px', width: '100%' }}
                        />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ fontSize: '1.5rem', marginRight: '8px', color: '#4a5568' }}>Age</label>
                        <input
                            type='number'
                            value={Age}
                            onChange={(e) => setAge(e.target.value)}
                            style={{ border: '2px solid #a0aec0', padding: '8px', width: '100%' }}
                        />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ fontSize: '1.5rem', marginRight: '8px', color: '#4a5568' }}>Job Role</label>
                        <input
                            type='text'
                            value={Job_Role}
                            onChange={(e) => setJobRole(e.target.value)}
                            style={{ border: '2px solid #a0aec0', padding: '8px', width: '100%' }}
                        />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ fontSize: '1.5rem', marginRight: '8px', color: '#4a5568' }}>Contact No</label>
                        <input
                            type='number'
                            value={Contact_No}
                            onChange={(e) => setContact_No(e.target.value)}
                            style={{ border: '2px solid #a0aec0', padding: '8px', width: '100%' }}
                        />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ fontSize: '1.5rem', marginRight: '8px', color: '#4a5568' }}>Salary</label>
                        <input
                            type='number'
                            value={Salary}
                            onChange={(e) => setSalary(e.target.value)}
                            style={{ border: '2px solid #a0aec0', padding: '8px', width: '100%' }}
                        />
                    </div>

                    <div style={{ textAlign: 'right' }}>
                        <button style={{ padding: '8px 16px', backgroundColor: '#48bb78', color: '#ffffff', borderRadius: '4px', border: 'none' }} onClick={handleEditEmployee}>
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditEmployee;
