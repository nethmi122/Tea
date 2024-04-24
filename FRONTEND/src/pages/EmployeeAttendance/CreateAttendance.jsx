import React, { useState, useEffect } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateAttendance = () => {
  const [Emp_ID, setEmp_ID] = useState('');
  const [Name, setName] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [InTime, setInTime] = useState('');
  const [OutTime, setOutTime] = useState('');
  const [WorkingHours, setWorkingHours] = useState('');
  const [OThours, setOThours] = useState('');
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [employeeAttendance, setEmployeeAttendance] = useState({});
  const navigate = useNavigate();

  // State to hold selected employee
  const [selectedEmployee, setSelectedEmployee] = useState({
    Emp_ID: '',
    Name: ''
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

  // Handler to update selected employee based on Emp_ID change
  const handleEmp_IDChange = (e) => {
    const selectedEmp_ID = e.target.value;
    const selectedEmp = employees.find((emp) => emp.Emp_ID === selectedEmp_ID);
    setSelectedEmployee({
      ...selectedEmployee,
      Emp_ID: selectedEmp_ID,
      Name: selectedEmp.Name,
    });
  };

  // Handler to update selected employee based on employee name change
  const handleNameChange = (e) => {
    const selectedName = e.target.value;
    const selectedEmp = employees.find(
      (emp) => emp.Name === selectedName
    );
    setSelectedEmployee({
      ...selectedEmployee,
      Emp_ID: selectedEmp.Emp_ID,
      Name: selectedName,
    });
  };

  // Handler to update InTime and calculate working hours
  const handleInTimeChange = (e) => {
    setInTime(e.target.value);
    calculateHoursWorked(e.target.value, OutTime); // Call calculateHoursWorked
  };

  // Handler to update OutTime and calculate working hours
  const handleOutTimeChange = (e) => {
    setOutTime(e.target.value);
    calculateHoursWorked(InTime, e.target.value); // Call calculateHoursWorked
  };

  // Function to calculate working hours and overtime
  const calculateHoursWorked = (inTime, outTime) => {
    // Parsing time strings to Date objects
    const inTimeParts = inTime.split(':');
    const outTimeParts = outTime.split(':');

    const inTimeDate = new Date(
      2000,
      0,
      1,
      parseInt(inTimeParts[0]),
      parseInt(inTimeParts[1]),
      0
    );
    const outTimeDate = new Date(
      2000,
      0,
      1,
      parseInt(outTimeParts[0]),
      parseInt(outTimeParts[1]),
      0
    );

    // Check if time inputs are valid
    if (isNaN(inTimeDate.getTime()) || isNaN(outTimeDate.getTime())) {
      console.error('Invalid input time format');
      return;
    }

    // Calculate time difference
    const timeDiff = outTimeDate - inTimeDate;
    const hoursWorked = timeDiff / (1000 * 60 * 60);
    const normalWorkingHours = 8;

    // Update working hours and overtime hours based on hours worked
    if (hoursWorked > normalWorkingHours) {
      const overtimeHours = hoursWorked - normalWorkingHours;
      setOThours(overtimeHours.toFixed(2));
      setWorkingHours(normalWorkingHours.toFixed(2));
    } else {
      setOThours('0.00');
      setWorkingHours(hoursWorked.toFixed(2));
    }
  };

  // Handler to save employee attendance
  const handleSaveEmployeeAttendance = () => {
    const data = {
      Emp_ID: selectedEmployee.Emp_ID,
      Name: selectedEmployee.Name,
      date: selectedDate,
      InTime,
      OutTime,
      WorkingHours,
      OThours,
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/employeeattendances', data)
      .then(() => {
        // Update employee attendance state
        setEmployeeAttendance((prevAttendance) => {
          const empID = selectedEmployee.Emp_ID;
          const newAttendance = { ...prevAttendance };
          if (newAttendance[empID]) {
            newAttendance[empID].push(data);
          } else {
            newAttendance[empID] = [data];
          }
          return newAttendance;
        });
        setLoading(false);
        navigate('/employeeattendances/showattendance');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  // Function to calculate total worked hours for each employee
  const calculateTotalWorkedHours = (empID) => {
    const attendanceEntries = employeeAttendance[empID] || [];
    let totalHours = 0;
    attendanceEntries.forEach((entry) => {
      totalHours += parseFloat(entry.WorkingHours);
    });
    return totalHours.toFixed(2);
  };

  return (
    <div className='p-4'>
      <BackButton destination='/employeeattendances/showattendance' />
      <h1 className='text-3xl my-4'>Create Employee Attendance</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex justify-center space-x-8'>
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[300px] p-4'>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Emp_ID</label>
            <select
              value={selectedEmployee.Emp_ID}
              onChange={handleEmp_IDChange}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            >
              <option value=''>Select Emp_ID</option>
              {employees.map((employee) => (
                <option key={employee._id} value={employee.Emp_ID}>
                  {employee.Emp_ID}
                </option>
              ))}
            </select>
          </div>
  
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
            <label className='text-xl mr-4 text-gray-500'>Date</label>
            <input
              type='Date'
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
          </div>
        </div>
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[300px] p-4'>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>InTime</label>
            <input
              type='time'
              value={InTime}
              onChange={handleInTimeChange}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
          </div>
  
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>OutTime</label>
            <input
              type='time'
              value={OutTime}
              onChange={handleOutTimeChange}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
          </div>
        </div>
        
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Working Hours</label>
          <input
            type='text'
            value={WorkingHours}
            readOnly
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Overtime Hours</label>
          <input
            type='text'
            value={OThours}
            readOnly
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
       
      </div>
      <div className='text-right mt-4'>
        <button
          className='p-4 bg-green-300 m-2 text-xl font-bold rounded-lg'
          style={{ width: '500px' }}
          onClick={handleSaveEmployeeAttendance}
        >
          Save
        </button>
      </div>
      {/* Display total worked hours for each employee */}
      {Object.keys(employeeAttendance).map((empID) => (
        <div key={empID}>
          <p>{`Employee ID: ${empID}, Total Worked Hours: ${calculateTotalWorkedHours(empID)}`}</p>
        </div>
      ))}
    </div>
  );
};

export default CreateAttendance;
