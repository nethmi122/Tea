import React, { useEffect, useState } from 'react';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import BackButton from '../../components/BackButton';
import { Link } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const ShowAllAttendance = () => {
    const [employeeattendances, setemployeeattendances] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchName, setSearchName] = useState('');
    const [searchDate, setSearchDate] = useState('');


  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/employeeattendances')
      .then((response) => {
        setemployeeattendances(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleSearch = () => {
    // Filter employeesAttendance based on search criteria
    const filteredAttendance = employeeattendances.filter((attendance) => {
        // Check if searchName and searchDate are empty or match the attendance record
        return (searchName === '' || attendance.Name.toLowerCase().includes(searchName.toLowerCase())) &&
            (searchDate === '' || attendance.date.includes(searchDate));
    });
    return filteredAttendance;
};

const filteredEmployeesAttendence = handleSearch();

 // Get unique employee names
 const employeeNames = [...new Set(employeeattendances.map((attendance) => attendance.Name))];

 return (

    
    <div className="flex">
      

      <div className='flex-1 p-4'>
      <BackButton destination='/employees/manage' />
      <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Employee Attendence List</h1>
                
    
                
                <div className="flex justify-center items-center mt-8">
                <Link to="/employeeattendances/createattendance">
                                         <MdOutlineAddBox className="text-sky-800 text-4xl" />
                                       </Link>
                    <div style={{ marginLeft: '10px' }}></div> {/* Space between buttons */}
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.location.href='/employeeattendances/reportattendance'}>
                        Report
                    </button>
                </div>
            </div>

        <div className='flex  justify-between mb-4'>
            <div className='flex items-center'> {/* Wrap select and input in a flex container */}
                <select
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className='p-2 border border-gray-300 rounded mr-2' >
                        
                    <option value=''>All Employees</option>
                    {employeeNames.map((name, index) => (
                        <option key={index} value={name}>
                            {name}
                        </option>
                    ))}
                </select>
                <input
                    type='month'
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                    className='p-2 border border-gray-300 rounded'/>
            </div>
        </div>



            {loading? (<Spinner/>
            ):(

              <table className='w-full border-separate border-spacing-2'>
    <thead>
        <tr>
            
            <th className='border border-slate-600 rounded-md'>Emp_ID</th>
            <th className='border border-slate-600 rounded-md'>Name</th>
            <th className='border border-slate-600 rounded-md max-md:hidden'>Date</th>
            <th className='border border-slate-600 rounded-md max-md:hidden'>InTime</th>
            <th className='border border-slate-600 rounded-md'>OutTime</th>
            <th className='border border-slate-600 rounded-md'>Workedhours</th>
            <th className='border border-slate-600 rounded-md'>OThours</th>
            <th className='border border-slate-600 rounded-md'>Action</th>
        </tr>
    </thead>
    <tbody>
        {filteredEmployeesAttendence.map((EmployeeAttendence) => (

            <tr key={EmployeeAttendence._id} className='h-8'>

                
                <td className='border border-slate-700 rounded-md text-center'>
                    {EmployeeAttendence.Emp_ID}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                    {EmployeeAttendence.Name}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                    {EmployeeAttendence.date}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                    {EmployeeAttendence.InTime}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                    {EmployeeAttendence.OutTime}
                </td>

                <td className='border border-slate-700 rounded-md text-center'>
                    {EmployeeAttendence.WorkingHours}
                </td>
                
                <td className='border border-slate-700 rounded-md text-center'>
                    {EmployeeAttendence.OThours}
                </td>
                
                <td className='border border-slate-700 rounded-md text-center'>
                    <div className='flex justify-center gap-x-4'>

                    <Link to={`/employeeattendances/deleteattendance/${EmployeeAttendence._id}`}>
                      <MdOutlineDelete className='text-2xl text-red-600' />
                    </Link>
                    </div>
                 </td>
              </tr>
        ))}
    </tbody>
</table>
            )}
        
      </div>
    </div>
  );
};

export default ShowAllAttendance;
