import React, { useEffect, useState, useRef } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';

const ReportEmployee = React.forwardRef((props, ref) => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const componentRef = useRef();
    //search
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

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
          console.error("Error fetching employee:", error);
          setError(
            "An error occurred while fetching the employee for the search query."
          );
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

    // Report generating
    const generatePDF = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Employee List',
        onAfterPrint: () => alert('Data saved in PDF'),
    });

    // Filter function to apply search query filter
    const applySearchFilter = (employee) => {
        return (
            
            employee.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            
            employee.Job_Role.toLowerCase().includes(searchQuery.toLowerCase()) 
            
        );
    };
    
    // Filter employee based on search query
    const filteredEmployee = employees.filter(applySearchFilter);

    return (
        <div ref={ref}>
            <div className="p-4">
                <BackButton destination='/' /> 
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl my-8">Employee List</h1>
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
                </div>
                {loading ? (
                    <Spinner />
                ) : (
                    <>
                        <table className="w-full border-separate border-spacing-2" ref={componentRef}>
                            <thead>
                                <tr>
                                    <th className="border border-slate-600 rounded-md">Emp_ID</th>
                                    <th className="border border-slate-600 rounded-md">Name</th>
                                    <th className="border border-slate-600 rounded-md">Age</th>
                                    <th className="border border-slate-600 rounded-md">Job_Role</th>
                                    <th className="border border-slate-600 rounded-md">Contact_No</th>
                                    <th className='border border-slate-600 rounded-md'>Salary</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEmployee.map((employee, index) => (
                                    <tr key={employee._id} className="h-8">
                                        <td className="border border-slate-700 rounded-md text-center">{employee.Emp_ID}</td>
                                        <td className="border border-slate-700 rounded-md text-center">{employee.Name}</td>
                                        <td className="border border-slate-700 rounded-md text-center">{employee.Age}</td>
                                        <td className="border border-slate-700 rounded-md text-center">{employee.Job_Role}</td>
                                        <td className="border border-slate-700 rounded-md text-center">{employee.Contact_No}</td>
                                        <td className='border border-slate-700 rounded-md text-center'>{employee.Salary}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* report button */}
                        <div className="flex justify-center items-center mt-8">
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={generatePDF}>
                                Generate PDF
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
});

export default ReportEmployee;

