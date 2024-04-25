import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { PORT, mongoDBURL } from "./config.js";
import employeeRoute from './routes/employeeRoute.js';
import EmployeeSalaryRoute from './routes/EmployeeSalaryRoute.js';
import EmployeeAttendanceRoute from './routes/EmployeeAttendanceRoute.js';
import supplierRoute from "./routes/supplierRoute.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use('/employees', employeeRoute);
app.use('/employeesalaries', EmployeeSalaryRoute);
app.use('/employeeattendances', EmployeeAttendanceRoute);
app.use('/suppliers', supplierRoute);

mongoose.connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
