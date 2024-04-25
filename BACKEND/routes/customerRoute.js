import express from 'express';
import { Customer_ } from '../models/Customer.js';

const router = express.Router();

router.post('/', async (request, response) => {
    try {
        const newCustomer = {
            Cus_ID: request.body.Cus_ID,
            Name: request.body.Name,
            Address: request.body.Address,
            Contact_No: request.body.Contact_No,
            Order_ID: request.body.Order_ID,
        };
        const customer = await Customer_.create(newCustomer);
        return response.status(201).send(customer);
    } catch (error) {
        console.error(error.message); 
        return response.status(500).send({ message: "Internal Server Error" });
    }
});

router.get('/', async (request, response) => {
    try {
        const customers = await Customer_.find({});
        return response.status(200).json({
            count: customers.length,
            data: customers
        });
    } catch (error) {
        console.error(error.message); 
        return response.status(500).send({ message: "Internal Server Error" });
    }
});

router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const customer = await Customer_.findById(id);
        return response.status(200).json(customer);
    } catch (error) {
        console.error(error.message); 
        return response.status(500).send({ message: "Internal Server Error" });
    }
});

router.put('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Customer_.findByIdAndUpdate(id, request.body);
        if (!result) {
            return response.status(400).json({ message: 'Customer not found' });
        }
        return response.status(200).send({ message: 'Customer updated successfully' });
    } catch (error) {
        console.error(error.message); 
        return response.status(500).send({ message: "Internal Server Error" });
    }
});

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Customer_.findByIdAndDelete(id);
        if (!result) {
            return response.status(400).json({ message: 'Customer not found' });
        }
        return response.status(200).send({ message: 'Customer deleted successfully' });
    } catch (error) {
        console.error(error.message); 
        return response.status(500).send({ message: "Customer Server Error" });
    }
});

router.get("/searchCustomer", async (req, res) => {
    try {
        const { page = 1, limit = 8, search = "", sort = "Cus_ID" } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const query = {
            $or: [
                { Cus_ID: { $regex: new RegExp(search, 'i') } },
                { Name: { $regex: new RegExp(search, 'i') } },
                { Address: { $regex: new RegExp(search, 'i') } },
                { Contact_No: { $regex: new RegExp(search, 'i') } },
                { Order_ID: { $regex: new RegExp(search, 'i') } },
            ],
        };
        const customer = await Customer_.find(query)
            .sort({ [sort]: 1 })
            .skip(skip)
            .limit(parseInt(limit));
        res.status(200).json({ count: customer.length, data: customer });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

export default router;