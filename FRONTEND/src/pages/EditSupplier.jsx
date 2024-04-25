import React, { useState, useEffect} from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditSupplier = () => {
    const [Sup_ID, setSupID] = useState('');
    const [Name, setName] = useState('');
    const [Age, setAge] = useState('');
    const [Contact_No, setContact_No] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();
    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/suppliers/${id}`)
        .then((response) => {
            setSupID(response.data.Sup_ID);
            setName(response.data.Name);
            setAge(response.data.Age);
            setContact_No(response.data.Contact_No)
            setLoading(false);

        }).catch((error) =>
        {
            setLoading(false);
            alert('An error happend');
            console.log(error);
        });
    }, [])

    const handleEditSupplier = () => {
        const data = {
            Sup_ID,
            Name,
            Age,
            Contact_No,
        };
        setLoading(true);
        axios
            .put(`http://localhost:5555/suppliers/${id}`, data)
            .then(() => {
                setLoading(false);
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                alert('An error occurred. Please try again.');
                console.log( error);
            });
    };

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Edit Supplier</h1>
            {loading && <Spinner />}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Sup_ID</label>
                    <input 
                        type='number'
                        value={Sup_ID}
                        onChange={(e) => setSupID(e.target.value)}
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
                    <label className='text-xl mr-4 text-gray-500'>Age</label>
                    <input 
                        type='number'
                        value={Age}
                        onChange={(e) => setAge(e.target.value)}
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

                <div>
                    <button className='p-2 bg-sky-300 m-8' onClick={handleEditSupplier}>
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditSupplier;