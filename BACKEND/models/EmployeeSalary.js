import mongoose from "mongoose";

const employeeSalarySchema = mongoose.Schema(
    {
    Emp_ID: {
        type: String,
        required: true,
    },
    Name: {
        type: String,
        required: true,
    },
    fromDate: {
        type: String,
        required: true,
    },
    toDate: {
        type: String,
        required: true,
    },
    totalOThours: {
        type: Number,
        //required: true,
    },
    totalOTpay: {
        type: Number,
        //required: true,
    },
  
    TotalSalary: {
        type: Number,
        //required: true,
    },

    }
);

export const EmployeeSalary = mongoose.model('EmployeeSalary' ,employeeSalarySchema);