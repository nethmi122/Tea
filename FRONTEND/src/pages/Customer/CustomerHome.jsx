import React, { useEffect, useState } from 'react';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import BackButton from '../../components/BackButton';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const CustomerHome = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5555/searchCustomer?search=${searchQuery}`
      );
      if (response.data.data.length === 0) {
        setError('No customers found with the provided search query.');
      } else {
        setCustomers(response.data.data);
        setError(null);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setError("An error occurred while fetching the customers for the search query.");
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
        console.error("Error fetching customers:", error);
        setLoading(false);
      });
  }, []);

  const applySearchFilter = (customer) => {
    if (!customer) return false;
    const { Name, Address } = customer;
    const searchLowerCase = searchQuery.toLowerCase();
    return (
      (Name && Name.toLowerCase().includes(searchLowerCase)) ||
      (Address && Address.toLowerCase().includes(searchLowerCase))
    );
  };

  const filteredCustomers = customers.filter(applySearchFilter);

  return (
    <div className='p-4'>
      <div>
        <BackButton destination='/' />
      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Customers List</h1>
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
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
        <div className="flex justify-center items-center mt-8">
          <MdOutlineAddBox className="text-sky-800 text-4xl" onClick={() => window.location.href='/customer_/createcus'} />
          <div style={{ marginLeft: '10px' }}></div> {/* Space between buttons */}
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.location.href='/customer_/reportcus'}>
            Report
          </button>
        </div>
      </div>

      {/* Display loading spinner or customer table */}
      {loading ? (
        <Spinner />
      ) : (
        <table className='w-full border-separate border-spacing-2'>
          <thead>
            <tr>
              <th className='border border-slate-600 rounded-md'>Cus_ID</th>
              <th className='border border-slate-600 rounded-md'>Name</th>
              <th className='border border-slate-600 rounded-md'>Address</th>
              <th className='border border-slate-600 rounded-md'>Contact_No</th>
              <th className='border border-slate-600 rounded-md'>Order_ID</th>
              <th className='border border-slate-600 rounded-md'>Operation</th>
            </tr>
          </thead>
          <tbody>
            {/* Display customers */}
            {filteredCustomers.map((customer) => (
              <tr key={customer._id} className='h-8'>
                <td className='border border-slate-700 rounded-md text-center'>{customer.Cus_ID}</td>
                <td className='border border-slate-700 rounded-md text-center'>{customer.Name}</td>
                <td className='border border-slate-700 rounded-md text-center'>{customer.Address}</td>
                <td className='border border-slate-700 rounded-md text-center'>{customer.Contact_No}</td>
                <td className='border border-slate-700 rounded-md text-center'>{customer.Order_ID}</td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {/* Operations (Info, Edit, Delete) for each customer */}
                  <AiOutlineEdit className="text-sky-800 text-4xl" onClick={() => window.location.href=`/customer_/editcus/${customer._id}`} />
                  <MdOutlineDelete className="text-sky-800 text-4xl" onClick={() => window.location.href=`/customer_/deletecus/${customer._id}`} />
                  <BsInfoCircle className="text-sky-800 text-4xl" onClick={() => window.location.href=`/customer_/readonecus/${customer._id}`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomerHome;
