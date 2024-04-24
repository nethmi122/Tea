import mongoose from "mongoose";

const employeeSchema = mongoose.Schema({
    Emp_ID:{
        type: Number,
        required: true,
    },

    Name:{
        type: String,
        required: true,
    },

    Age:{
        type: Number,
        required: true,
    },

    Job_Role:{
        type: String,
        required: true,
    },

    Contact_No:{
        type: Number,
        required: true,
    },

    Salary:{
        type: Number,
        required: true,
    }


},
{
    timestamps: true,
});

export const Employee = mongoose.model('Employee',employeeSchema);