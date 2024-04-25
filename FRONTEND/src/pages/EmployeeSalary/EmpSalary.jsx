import React, { useEffect,useState} from 'react';
import axios from 'axios';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import {Link} from 'react-router-dom';
import {AiOutlineEdit} from 'react-icons/ai';
//import {BsInfoCircle} from 'react-icons/bs';
import {MdOutlineAddBox , MdOutlineDelete} from 'react-icons/md';

function EmpSalary() {

    const [employeesalaries, setemployeesalaries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchName, setSearchName] = useState('');
    const [searchDate, setSearchDate] = useState('');
    
    //const [showType, setShowType] = useState('table');


    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/employeesalaries')
            .then((response) => {
                setemployeesalaries(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const handleSearch = () => {
        // Filter employeesalaries based on search criteria
        const filteredSalary = employeesalaries.filter((salary) => {
            // Check if searchName and searchDate are empty or match the salary record
            return (searchName === '' || salary.Name.toLowerCase().includes(searchName.toLowerCase())) &&
                (searchDate === '' || salary.fromDate.includes(searchDate));
        });
        return filteredSalary;
    };

    const filteredemployeesalaries = handleSearch();

    // Get unique employee names
    const Names = [...new Set(employeesalaries.map((salary) => salary.Name))];



  return (

    
    <div className="flex">
      

      <div className='flex-1 p-4'>
      <BackButton destination='/employees/manage' /> 
      <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Employee Salary List</h1>
                
    
                
                <div className="flex justify-center items-center mt-8">
                <Link to="/employeesalaries/createsalary">
                                         <MdOutlineAddBox className="text-sky-800 text-4xl" />
                                       </Link>
                    <div style={{ marginLeft: '10px' }}></div> {/* Space between buttons */}
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.location.href='/EmployeeSalary/reportEmployeeSalary'}>
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
                    {Names.map((name, index) => (
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
            <th className='border border-slate-600 rounded-md '>fromDate</th>
            <th className='border border-slate-600 rounded-md '>toDate</th>
            <th className='border border-slate-600 rounded-md '>totalOThours</th>
            <th className='border border-slate-600 rounded-md'>totalOTpay</th>
            <th className='border border-slate-600 rounded-md'>TotalSalary</th>
            <th className='border border-slate-600 rounded-md'>Action</th>
        </tr>
    </thead>
    <tbody>
        {filteredemployeesalaries.map((EmployeeSalary) => (

            <tr key={EmployeeSalary._id} className='h-8'>

                
                <td className='border border-slate-700 rounded-md text-center'>
                    {EmployeeSalary.Emp_ID}
                </td>
                <td className='border border-slate-700 rounded-md text-center '>
                    {EmployeeSalary.Name}
                </td>
                <td className='border border-slate-700 rounded-md text-center '>
                    {EmployeeSalary.fromDate}
                </td>
                <td className='border border-slate-700 rounded-md text-center '>
                    {EmployeeSalary.toDate}
                </td>
                <td className='border border-slate-700 rounded-md text-center '>
                    {EmployeeSalary.totalOThours}
                </td>
                <td className='border border-slate-700 rounded-md text-center '>
                    {EmployeeSalary.totalOTpay}
                </td>



                <td className='border border-slate-700 rounded-md text-center'>
                    {EmployeeSalary.TotalSalary}
                </td>
                
                <td className='border border-slate-700 rounded-md text-center'>
                    <div className='flex justify-center gap-x-4'>
                    
                        <Link to={`/employeesalaries/deletesalary/${EmployeeSalary._id}`}>
                            <MdOutlineDelete className='text-2x1 text-red-600' />
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
  )
}

export default EmpSalary;
