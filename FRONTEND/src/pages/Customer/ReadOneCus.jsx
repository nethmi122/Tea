import React, {useEffect, useState } from 'react';
import BackButton from '../../components/BackButton';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { useParams } from 'react-router-dom';


const ReadOneCus = () => {
    const [customer, setCustomer] = useState({});
    const [loading, setLoading]=useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/customer_/${id}`)
        .then((response) => {
            setCustomer(response.data);
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
        });
    }, [])
    return(
        <div className='p-4'>
            <BackButton destination='/customer_/home' />
            <h1 className='text-3xl my-4'>Read One Customer</h1>
            {loading ?(
                <Spinner />
            ) : (
                <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
                    <div className='my-4'>
                        <span className = 'text-xl mr-4 text-gray-500'>Cus_ID</span>
                        <span>{customer.Cus_ID}</span>
                    </div>

                    <div className='my-4'>
                        <span className = 'text-xl mr-4 text-gray-500'>Name</span>
                        <span>{customer.Name}</span>
                    </div>

                    <div className='my-4'>
                        <span className = 'text-xl mr-4 text-gray-500'>Address</span>
                        <span>{customer.Address}</span>
                    </div>

                    <div className='my-4'>
                        <span className = 'text-xl mr-4 text-gray-500'>Contact_No</span>
                        <span>{customer.Contact_No}</span>
                    </div>

                    <div className='my-4'>
                        <span className = 'text-xl mr-4 text-gray-500'>Order_ID</span>
                        <span>{customer.Order_ID}</span>
                    </div>

                    <div className='my-4'>
                        <span className = 'text-xl mr-4 text-gray-500'>Create Time</span>
                        <span>{new Date(customer.updatedAt).toString()}</span>
                    </div>

                    <div className='my-4'>
                        <span className = 'text-xl mr-4 text-gray-500'>Last Updated Time</span>
                        <span>{new Date(customer.updatedAt).toString()}</span>
                    </div>

                    </div>
            )}
            </div>
    )
}

export default ReadOneCus;