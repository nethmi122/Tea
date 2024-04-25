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
import CreateSupplier from './pages/CreateSupplier';
import DeteleSupplier from './pages/DeleteSupplier';
import EditSupplier from './pages/EditSupplier';
import ShowSupplier from './pages/ShowSupplier';
import ManageSupplier from './pages//ManageSupplier';
import SupplierReport from './pages/SupplierReport';
import SupplierHome from './pages/SupplierHome';









const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
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

      <Route path='/suppliers/suphome' element={<SupplierHome/>}/>
      <Route path='/suppliers/create' element={<CreateSupplier />} />
      <Route path='/suppliers/manage' element={<ManageSupplier />} />
      <Route path='/suppliers/details/:id' element={<ShowSupplier />} />
      <Route path='/suppliers/edit/:id' element={<EditSupplier />} />
      <Route path='/suppliers/delete/:id' element={<DeteleSupplier />} />
      <Route path='/suppliers/reportSupplier' element={<SupplierReport />} />








      
     


    </Routes>
  )
}

export default App