import React, { useState, useEffect } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateEmployeeSalary = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [totalOThours, setTotalOThours] = useState(0);
  const [totalOTpay, setTotalOTpay] = useState(0);
  const [TotalSalary, setTotalSalary] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [employeeAttendances, setEmployeeAttendances] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [selectedEmployee, setSelectedEmployee] = useState({
    Emp_ID: '',
    Name: '',
    Salary: 0,
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/employees')
      .then((response) => {
        setEmployees(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/employeeattendances')
      .then((response) => {
        setEmployeeAttendances(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleNameChange = (e) => {
    const selectedName = e.target.value;
    const selectedEmp = employees.find((emp) => emp.Name === selectedName);
    setSelectedEmployee({
      ...selectedEmployee,
      Emp_ID: selectedEmp?.Emp_ID || '',
      Name: selectedName,
      Salary: selectedEmp?.Salary || 0,
    });
  };

  const calculateTotalOvertimeHours = () => {
    const filteredAttendance = employeeAttendances.filter(
      (attendance) =>
        attendance.Name === selectedEmployee.Name &&
        new Date(attendance.date) >= new Date(fromDate) &&
        new Date(attendance.date) <= new Date(toDate)
    );
    const totalOvertimeHours = filteredAttendance.reduce(
      (total, attendance) => total + attendance.OThours,
      0
    );
    setTotalOThours(totalOvertimeHours);
  };

  const calculateTotalOTpay = () => {
    const calculatedTotalOTpay = totalOThours * 500;
    setTotalOTpay(calculatedTotalOTpay);
  };

  const calculateTotalSalary = () => {
    const totalSalary = selectedEmployee.Salary + totalOTpay;
    setTotalSalary(totalSalary);
  };

  const handleSaveEmployeeSalary = () => {
    calculateTotalSalary();
    calculateTotalOvertimeHours();
    calculateTotalOTpay();
    

    const data = {
      Emp_ID: selectedEmployee.Emp_ID,
      Name: selectedEmployee.Name,
      fromDate,
      toDate,
      totalOThours,
      totalOTpay,
      TotalSalary,
    };

    setLoading(true);
    axios
      .post('http://localhost:5555/employeesalaries', data)
      .then(() => {
        setLoading(false);
        navigate('/employeesalaries/empsalary');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton destination='/employeesalaries/empsalary' />
      <h1 className='text-3xl my-4'>Create Employee Salary</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex justify-center space-x-8'>
        <div className='flex space-x-4'>
          <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[300px] p-4'>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Employee Name</label>
              <select
                value={selectedEmployee.Name}
                onChange={handleNameChange}
                className='border-2 border-gray-500 px-4 py-2 w-full'
              >
                <option value=''>Select Employee Name</option>
                {employees.map((employee) => (
                  <option key={employee._id} value={employee.Name}>
                    {employee.Name}
                  </option>
                ))}
              </select>
            </div>

            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>fromDate</label>
              <input
                type='date'
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2 w-full'
              />
            </div>

            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>toDate</label>
              <input
                type='date'
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2 w-full'
              />
            </div>
          </div>

          <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[300px] p-4'>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Total OT Hours</label>
              <input
                type='text'
                value={totalOThours}
                readOnly
                className='border-2 border-gray-500 px-4 py-2 w-full'
              />
              <button className='p-2 bg-sky-300 m-2' onClick={calculateTotalOvertimeHours}>
                Calculate Total OT Hours
              </button>
            </div>
          </div>

          <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[300px] p-4'>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Total OT Pay</label>
              <input
                type='text'
                value={totalOTpay}
                readOnly
                className='border-2 border-gray-500 px-4 py-2 w-full'
              />
              <button className='p-2 bg-sky-300 m-2' onClick={calculateTotalOTpay}>
                Calculate Total OT Pay
              </button>
            </div>
          </div>

          <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[300px] p-4'>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Total Salary</label>
              <input
                type='text'
                value={TotalSalary}
                readOnly
                className='border-2 border-gray-500 px-4 py-2 w-full'
              />
               <button className='p-2 bg-sky-300 m-2' onClick={calculateTotalSalary}>
                Calculate Total Salary
              </button>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          className='p-2 bg-sky-300 m-2'
          style={{ width: '150px' }}
          onClick={handleSaveEmployeeSalary}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateEmployeeSalary;
