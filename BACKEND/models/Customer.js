import mongoose from "mongoose";

const customerSchema = mongoose.Schema({
   Cus_ID:{
        type: Number,
        required: true,
    },

    Name:{
        type: String,
        required: true,
    },

    Address:{
        type: String,
        required: true,
    },

    Contact_No:{
        type: String,
        required: true,
    },

    Order_ID:{
        type: Number,
        required: true,
    }


},
{
    timestamps: true,
});

export const Customer_ = mongoose.model('Customer_',customerSchema);