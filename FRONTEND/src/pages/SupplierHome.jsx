import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const SupplierHome = () => {
  const [suppliers, setSupplier] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5555/searchSupplier?search=${searchQuery}`
      );
      setSupplier(response.data.data);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error("Error fetching supplier:", error);
      setError("An error occurred while fetching the supplier for the search query.");
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/suppliers')
      .then((response) => {
        setSupplier(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const applySearchFilter = (supplier) => {
    if (!supplier) return false;
    const { Sup_ID, Name, Age, Contact_No } = supplier;
    const searchLowerCase = searchQuery.toLowerCase();
    return (
     
      (Name && Name.toLowerCase().includes(searchLowerCase))
      
    );
  };

  const filteredSupplier = suppliers.filter(applySearchFilter);

  return (
    <div className='p-4'>

<div>
    <Link to="/suppliers/manage" style={{ fontSize: '1.5rem', color: 'darkgreen' }}>
        Supplier Dashboard
    </Link>

</div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Supplier List</h1>
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
        <Link to="/suppliers/create">
                                         <MdOutlineAddBox className="text-sky-800 text-4xl" />
                                       </Link>
          <div style={{ marginLeft: '10px' }}></div> {/* Space between buttons */}
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.location.href='/suppliers/SupplierReport'}>
            Report
          </button>
        </div>
      </div>

      {/* Display loading spinner or supplier table */}
      {loading ? (
        <Spinner />
      ) : (
        <table className='w-full border-separate border-spacing-2'>
          <thead>
            <tr>
              <th className='border border-slate-600 rounded-md'>Sup_ID</th>
              <th className='border border-slate-600 rounded-md'>Name</th>
              <th className='border border-slate-600 rounded-md'>Age</th>
              <th className='border border-slate-600 rounded-md'>Contact_No</th>
              <th className='border border-slate-600 rounded-md'>Operation</th>

            </tr>
          </thead>
          <tbody>
            {/* Display supplier */}
            {filteredSupplier.map((supplier) => (
              <tr key={supplier._id} className='h-8'>
                <td className='border border-slate-700 rounded-md text-center'>{supplier.Sup_ID}</td>
                <td className='border border-slate-700 rounded-md text-center'>{supplier.Name}</td>
                <td className='border border-slate-700 rounded-md text-center'>{supplier.Age}</td>
                <td className='border border-slate-700 rounded-md text-center'>{supplier.Contact_No}</td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {/* Operations (Info, Edit, Delete) for each employee */}
                  <div className='flex justify-center gap-x-4'>
                    <Link to={`/suppliers/details/${supplier._id}`}>
                      <BsInfoCircle className='text-2xl style' />
                    </Link>
                    <Link to={`/suppliers/edit/${supplier._id}`}>
                      <AiOutlineEdit className='text-2xl text-yellow-600' />
                    </Link>
                    <Link to={`/suppliers/delete/${supplier._id}`}>
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
  );
};

export default SupplierHome;