import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'; // Adjust the casing to match the file name
import CreateEmployee from './pages/CreateEmployee';
import DeteleEmployee from './pages/DeleteEmployee';
import EditEmployee from './pages/EditEmployeee';
import ShowEmployee from './pages/ShowEmployee';
import ManageEmployee from './pages//ManageEmployee';
import EmpSalary from './pages/EmployeeSalary/EmpSalary';
import ReportEmployee from './pages/ReportEmployee';
import CreateAttendence from './pages/EmployeeAttendance/CreateAttendance';
import ShowAllAttendance from './pages/EmployeeAttendance/ShowAllAttendance';
import DeleteAttendance from './pages/EmployeeAttendance/DeleteAttendance';
import CreateSalary from './pages/EmployeeSalary/CreateSalary';
import DeleteSalary from './pages/EmployeeSalary/DeleteSalary';
import ReportAttendance from './pages/EmployeeAttendance/ReportAttendance';
import CreateCustomer from './pages/Customer/createCustomer';
 import CustomerHome from './pages/Customer/CustomerHome';
 import MainHome from './pages/MainHome';
 import DeleteCustomer from './pages/Customer/DeleteCustomer';
 import EditCustomer from './pages/Customer/EditCustomer';
 import ReportCustomer from './pages/Customer/ReportCustomer';
 import ReadOneCus from './pages/Customer/ReadOneCus';


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<MainHome />} />
      <Route path='/employees/emphome' element={<Home />} />
      <Route path='/employees/create' element={<CreateEmployee />} />
      <Route path='/employees/manage' element={<ManageEmployee />} />
      <Route path='/employees/salary' element={<EmpSalary />} />
      <Route path='/employees/details/:id' element={<ShowEmployee />} />
      <Route path='/employees/edit/:id' element={<EditEmployee />} />
      <Route path='/employees/delete/:id' element={<DeteleEmployee />} />
      <Route path='/employees/reportEmployee' element={<ReportEmployee />} />

      <Route path='/employeeattendances/createattendance' element={<CreateAttendence />} />
      <Route path='/employeeattendances/showattendance' element={<ShowAllAttendance />} />
      <Route path='/employeeattendances/deleteattendance/:id' element={<DeleteAttendance />} />
      <Route path='/employeeattendances/reportattendance' element={<ReportAttendance />} />

      <Route path='/employeesalaries/createsalary' element={<CreateSalary />} />
      <Route path='/employeesalaries/empsalary' element={<EmpSalary />} />
      <Route path='/employeesalaries/deletesalary/:id' element={<DeleteSalary />} />

      <Route path='/customer_/home' element={<CustomerHome />} />
      <Route path='/customer_/createcus' element={<CreateCustomer />} />
      <Route path='/customer_/deletecus/:id' element={<DeleteCustomer />} />
      <Route path='/customer_/editcus/:id' element={<EditCustomer />} />
      <Route path='/customer_/readonecus/:id' element={<ReadOneCus />} />
      <Route path='/customer_/reportcus' element={<ReportCustomer />} />


      
     


    </Routes>
  )
}

export default App