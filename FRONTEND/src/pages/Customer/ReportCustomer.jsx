import React, { useEffect, useState, useRef } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';

const ReportCustomer = React.forwardRef((props, ref) => {
    const [customer_, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const componentRef = useRef();
    //search
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `http://localhost:5555/searchCustomer?search=${searchQuery}`
          );
          setCustomers(response.data.data);
          setLoading(false);
          setError(null);
        } catch (error) {
          console.error("Error fetching customer:", error);
          setError(
            "An error occurred while fetching the customer for the search query."
          );
          setLoading(false);
        }
      };

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/customer_')
            .then((response) => {
                setCustomers(response.data.data);
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
        documentTitle: 'Customers List',
        onAfterPrint: () => alert('Data saved in PDF'),
    });

    // Filter function to apply search query filter
    const applySearchFilter = (customer) => {
        return (
            
            customer.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            
            customer.Address.toLowerCase().includes(searchQuery.toLowerCase()) 
            
        );
    };
    
    // Filter customer
    const filteredCustomer = customer_.filter(applySearchFilter);

    return (
        <div ref={ref}>
            <div className="p-4">
                <BackButton destination='/customer_/home' /> 
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl my-8">Customer List</h1>
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
                                    <th className="border border-slate-600 rounded-md">Cus_ID</th>
                                    <th className="border border-slate-600 rounded-md">Name</th>
                                    <th className="border border-slate-600 rounded-md">Address</th>
                                    <th className="border border-slate-600 rounded-md">Contact_No</th>
                                    <th className='border border-slate-600 rounded-md'>Order_ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCustomer.map((customer, index) => (
                                    <tr key={customer._id} className="h-8">
                                        <td className="border border-slate-700 rounded-md text-center">{customer.Cus_ID}</td>
                                        <td className="border border-slate-700 rounded-md text-center">{customer.Name}</td>
                                        <td className="border border-slate-700 rounded-md text-center">{customer.Address}</td>
                                        <td className="border border-slate-700 rounded-md text-center">{customer.Contact_No}</td>
                                        <td className='border border-slate-700 rounded-md text-center'>{customer.Order_ID}</td>
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

export default ReportCustomer;

