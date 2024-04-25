import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const ManageSupplier = () => {
    const [suppliers, setSupplier] = useState([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5555/suppliers`)
            .then((response) => {
                setSupplier(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false)
            });
    }, []);

    return (
        <div className='p-4'>

            <div className='flex justify-center items-center mb-8'>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center' }}>Supplier Dashboard</h1>
            </div>

            <div className='options flex justify-center'>
                <Link to="/" className="option-box bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-2">
                    Supplier Details
                </Link>
            </div>
        </div>
    )
}

export default ManageSupplier;
