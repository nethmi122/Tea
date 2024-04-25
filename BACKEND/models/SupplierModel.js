import mongoose from "mongoose";

const supplierSchema = mongoose.Schema({
    Sup_ID:{
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
    Contact_No:{
        type: Number,
        required: true,
    },
},
{
    timestamps: true,
});

export const Supplier = mongoose.model('Supplier',supplierSchema);
