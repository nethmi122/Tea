import mongoose from "mongoose";

const employeeAttendenceSchema = mongoose.Schema(
    {
    Emp_ID: {
        type: String,
        required: true,
    },
    Name: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    InTime: {
        type: String,
        //required: true,
    },
    OutTime: {
        type: String,
        //required: true,
    },
    WorkingHours: {
        type: Number,
        //required: true,
    },
    OThours: {
        type: Number,
        //required: true,
    },
    

    }
);

export const EmployeeAttendence = mongoose.model('EmployeeAttendence' ,employeeAttendenceSchema);