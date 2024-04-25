import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Employee } from "./models/employeeModel.js";
import employeeRoute from './routes/employeeRoute.js';
import { EmployeeSalary } from "./models/EmployeeSalary.js";
import EmployeeSalaryRoute from './routes/EmployeeSalaryRoute.js';
import { EmployeeAttendence } from "./models/EmployeeAttendance.js";
import EmployeeAttendanceRoute from './routes/EmployeeAttendanceRoute.js';
import { Customer_ } from "./models/Customer.js";
import CustomerRoute from "./routes/customerRoute.js";
import cors from 'cors';

const app = express();

app.use(express.json());


app.use(cors());

 

app.use('/employees',employeeRoute);
app.use('/employeesalaries',EmployeeSalaryRoute);
app.use('/employeeattendances',EmployeeAttendanceRoute);
app.use('/customer_',CustomerRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
