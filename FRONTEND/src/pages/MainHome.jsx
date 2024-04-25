import React from 'react';

const MainHome = () => {
  const buttonStyle = {
    width: 'calc(20% - 10px)',
    height: '100px',
    backgroundColor: '#4CAF50',
    color: 'white',
    borderRadius: '5px',
    border: 'none',
    margin: '2.5%',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  const hoverStyle = {
    backgroundColor: '#45a049',
  };

  return (
    <div>
        
      <h1>Welcome to the Management System</h1>
      <a href="/customer_/home">
        <button style={buttonStyle} onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
                                    onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}>
          Customer Management
        </button>
      </a>
      <a href="/product-management">
        <button style={buttonStyle} onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
                                    onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}>
          Product Management
        </button>
      </a>
      <a href="/employees/manage">
        <button style={buttonStyle} onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
                                    onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}>
          Employee Management
        </button>
      </a>
      <a href="/supplier-management">
        <button style={buttonStyle} onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
                                    onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}>
          Supplier Management
        </button>
      </a>
      <a href="/financial-management">
        <button style={buttonStyle} onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
                                    onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}>
          Financial Management
        </button>
      </a>
    </div>
  );
};

export default MainHome;
