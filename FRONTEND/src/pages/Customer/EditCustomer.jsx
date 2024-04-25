import React, { useState, useEffect} from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditCustomer = () => {
    const [Cus_ID, setCusID] = useState('');
    const [Name, setName] = useState('');
    const [Address, setAddress] = useState('');
    const [Contact_No, setContact_No] = useState('');
    const [Order_ID, setOrderID] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();
    
    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/customer_/${id}`)
        .then((response) => {
            setCusID(response.data.Cus_ID);
            setName(response.data.Name);
            setAddress(response.data.Address);
            setContact_No(response.data.Contact_No);
            setOrderID(response.data.Order_ID);
            setLoading(false);

        }).catch((error) => {
            setLoading(false);
            alert('An error happened');
            console.log(error);
        });
    }, []);

    const validateName = (name) => {
        // Validate that Name contains only alphabetical characters
        return /^[a-zA-Z]+$/.test(name);
    };

    const validateContactNo = (contactNo) => {
        // Validate that Contact_No has 10 digits and starts with 0
        return /^0\d{9}$/.test(contactNo);
    };

    const handleEditCustomer = () => {
        if (!validateName(Name)) {
            setErrorMessage('Name must contain only alphabetical characters.');
            return;
        }

        if (!validateContactNo(Contact_No)) {
            setErrorMessage('Contact number must have 10 digits and start with 0.');
            return;
        }

        const data = {
            Cus_ID,
            Name,
            Address,
            Contact_No,
            Order_ID,
        };
        setLoading(true);
        axios
            .put(`http://localhost:5555/customer_/${id}`, data)
            .then(() => {
                setLoading(false);
                navigate('/customer_/home');
            })
            .catch((error) => {
                setLoading(false);
                alert('An error occurred. Please try again.');
                console.log(error);
            });
    };

    return (
        <div className='p-4'>
             <BackButton destination='/customer_/home' />
            <h1 className='text-3xl my-4'>Edit Customer</h1>
            {loading && <Spinner />}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Cus_ID</label>
                    <input 
                        type='number'
                        value={Cus_ID}
                        onChange={(e) => setCusID(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>

                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Name</label>
                    <input 
                        type='text'
                        value={Name}
                        onChange={(e) => setName(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>

                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Address</label>
                    <input 
                        type='text'
                        value={Address}
                        onChange={(e) => setAddress(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>


                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Contact_No</label>
                    <input 
                        type='number'
                        value={Contact_No}
                        onChange={(e) => setContact_No(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>

                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Order_ID</label>
                    <input 
                        type='number'
                        value={Order_ID}
                        onChange={(e) => setOrderID(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>


                <div>
                    <button className='p-2 bg-sky-300 m-8' onClick={handleEditCustomer}>
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditCustomer;
