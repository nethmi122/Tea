import React, { useEffect, useState, useRef } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';

const ReportAttendance = React.forwardRef((props, ref) => {
    const [employeeattendances, setEmployeesAttendence] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchName, setSearchName] = useState('');
    const [searchDate, setSearchDate] = useState('');

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/employeeattendances')
            .then((response) => {
                setEmployeesAttendence(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const handleSearch = () => {
        return employeeattendances.filter((attendance) => {
            return (
                (searchName === '' || attendance.Name.toLowerCase().includes(searchName.toLowerCase())) &&
                (searchDate === '' || attendance.date.includes(searchDate))
            );
        });
    };

    const filteredEmployeesAttendence = handleSearch();

    const Name = [...new Set(employeeattendances.map((attendance) => attendance.Name))];

    const generatePDF = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Employee Attendance List',
        onAfterPrint: () => alert('Data saved in PDF'),
    });

    const componentRef = useRef();

    return (
        <div className="flex">
            <div className="flex-1 p-4">
                <BackButton destination="/employeeattendances/showattendance" />
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl my-8">Employee Attendance List</h1>
                </div>
                <div className="flex justify-between mb-4">
                    <div className="flex items-center">
                        <select
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                            className="p-2 border border-gray-300 rounded mr-2"
                        >
                            <option value="">All Employees</option>
                            {Name.map((Name, index) => (
                                <option key={index} value={Name}>
                                    {Name}
                                </option>
                            ))}
                        </select>
                        <input
                            type="month"
                            value={searchDate}
                            onChange={(e) => setSearchDate(e.target.value)}
                            className="p-2 border border-gray-300 rounded"
                        />
                    </div>
                </div>
                {loading ? (
                    <Spinner />
                ) : (
                    <div ref={componentRef}>
                        <table className="w-full border-separate border-spacing-2">
                            <thead>
                                <tr>
                                    
                                    <th className="border border-slate-600 rounded-md">Emp_ID</th>
                                    <th className="border border-slate-600 rounded-md">Name</th>
                                    <th className="border border-slate-600 rounded-md ">Date</th>
                                    <th className="border border-slate-600 rounded-md ">InTime</th>
                                    <th className="border border-slate-600 rounded-md">OutTime</th>
                                    <th className="border border-slate-600 rounded-md">Workinghours</th>
                                    <th className="border border-slate-600 rounded-md">OThours</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEmployeesAttendence.map((EmployeeAttendence, index) => (
                                    <tr key={EmployeeAttendence._id} className="h-8">
                                        
                                        <td className="border border-slate-700 rounded-md text-center">{EmployeeAttendence.Emp_ID}</td>
                                        <td className="border border-slate-700 rounded-md text-center ">{EmployeeAttendence.Name}</td>
                                        <td className="border border-slate-700 rounded-md text-center ">{EmployeeAttendence.date}</td>
                                        <td className="border border-slate-700 rounded-md text-center ">{EmployeeAttendence.InTime}</td>
                                        <td className="border border-slate-700 rounded-md text-center ">{EmployeeAttendence.OutTime}</td>
                                        <td className="border border-slate-700 rounded-md text-center ">{EmployeeAttendence.WorkingHours}</td>
                                        <td className="border border-slate-700 rounded-md text-center">{EmployeeAttendence.OThours}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <div className="flex justify-center items-center mt-8">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={generatePDF}>
                        Generate PDF
                    </button>
                </div>
            </div>
        </div>
    );
});

export default ReportAttendance;