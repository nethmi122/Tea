import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5555/searchEmployee?search=${searchQuery}`
      );
      setEmployees(response.data.data);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setError("An error occurred while fetching the employees for the search query.");
      setLoading(false);
    }
  };

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

  const applySearchFilter = (employee) => {
    if (!employee) return false;
    const { Emp_ID, Name, Age, Job_Role, Contact_No } = employee;
    const searchLowerCase = searchQuery.toLowerCase();
    return (
      (Name && Name.toLowerCase().includes(searchLowerCase)) ||
      (Job_Role && Job_Role.toLowerCase().includes(searchLowerCase)) 
    );
  };

  const filteredEmployees = employees.filter(applySearchFilter);

  return (
    <div className='p-4' style={{ backgroundColor: '#f0fff0' }}>
      <BackButton destination='/employees/manage' />
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8 font-bold'>Employees List</h1>
        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter search query"
            className="mr-2 border border-gray-400 p-2"
          />
          <button
            onClick={handleSearch}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Search
          </button>
        </div>
        <div className="flex justify-center items-center mt-8">
          <Link to="/employees/create">
            <MdOutlineAddBox className="text-sky-800 text-4xl" />
          </Link>
          <div style={{ marginLeft: '10px' }}></div> {/* Space between buttons */}
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.location.href='/employees/ReportEmployee'}>
            Report
          </button>
        </div>
      </div>

      {/* Display loading spinner or employee table */}
      {loading ? (
        <Spinner />
      ) : (
        <table className='w-full border-separate border-spacing-2'>
          <thead>
            <tr>
              <th className='border border-slate-600 rounded-md font-bold'>Emp_ID</th>
              <th className='border border-slate-600 rounded-md font-bold'>Name</th>
              <th className='border border-slate-600 rounded-md font-bold'>Age</th>
              <th className='border border-slate-600 rounded-md font-bold'>Job_Role</th>
              <th className='border border-slate-600 rounded-md font-bold'>Contact_No</th>
              <th className='border border-slate-600 rounded-md font-bold'>Salary</th>
              <th className='border border-slate-600 rounded-md font-bold'>Operation</th>
            </tr>
          </thead>
          ...
<tbody>
  {/* Display employees */}
  {filteredEmployees.map((employee) => (
    <tr key={employee._id} className='h-8'>
      <td className='border border-slate-700 rounded-md text-center' style={{ borderColor: '#d3d3d3' }}>{employee.Emp_ID}</td>
      <td className='border border-slate-700 rounded-md text-center' style={{ borderColor: '#d3d3d3' }}>{employee.Name}</td>
      <td className='border border-slate-700 rounded-md text-center' style={{ borderColor: '#d3d3d3' }}>{employee.Age}</td>
      <td className='border border-slate-700 rounded-md text-center' style={{ borderColor: '#d3d3d3' }}>{employee.Job_Role}</td>
      <td className='border border-slate-700 rounded-md text-center' style={{ borderColor: '#d3d3d3' }}>{employee.Contact_No}</td>
      <td className='border border-slate-700 rounded-md text-center' style={{ borderColor: '#d3d3d3' }}>{employee.Salary}</td>
      <td className='border border-slate-700 rounded-md text-center' style={{ borderColor: '#d3d3d3' }}>
        {/* Operations (Info, Edit, Delete) for each employee */}
        <div className='flex justify-center gap-x-4'>
          <Link to={`/employees/details/${employee._id}`}>
            <BsInfoCircle className='text-2xl style' />
          </Link>
          <Link to={`/employees/edit/${employee._id}`}>
            <AiOutlineEdit className='text-2xl text-yellow-600' />
          </Link>
          <Link to={`/employees/delete/${employee._id}`}>
            <MdOutlineDelete className='text-2xl text-red-600' />
          </Link>
        </div>
      </td>
    </tr>
  ))}
</tbody>
...

        </table>
      )}
    </div>
  );
};

export default Home;
