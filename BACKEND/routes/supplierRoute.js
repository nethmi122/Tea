import express from 'express';
import { Supplier } from '../models/SupplierModel.js';

const router = express.Router();

router.post('/', async (request, response) => {
    try {
        const newSupplier = {
            Sup_ID: request.body.Sup_ID,
            Name: request.body.Name,
            Age: request.body.Age,
            Contact_No: request.body.Contact_No,
        };
        const supplier = await Supplier.create(newSupplier);
        return response.status(201).json(supplier);
    } catch (error) {
        console.error(error.message); 
        return response.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/', async (request, response) => {
    try {
        const suppliers = await Supplier.find({});
        return response.status(200).json({
            count: suppliers.length,
            data: suppliers
        });
    } catch (error) {
        console.error(error.message); 
        return response.status(500).json({ message: "Internal Server Error" });
    }
});
router.put('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Supplier.findByIdAndUpdate(id, request.body);
        if (!result) {
            return response.status(400).json({ message: 'Supplier not found' });
        }
        return response.status(200).send({ message: 'Supplier updated successfully' });
    } catch (error) {
        console.error(error.message); 
        return response.status(500).send({ message: "Internal Server Error" });
    }
});

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Supplier.findByIdAndDelete(id);
        if (!result) {
            return response.status(400).json({ message: 'Supplier not found' });
        }
        return response.status(200).send({ message: 'Supplier deleted successfully' });
    } catch (error) {
        console.error(error.message); 
        return response.status(500).send({ message: "Internal Server Error" });
    }
});

router.get("/searchSupplier", async (req, res) => {
    try {
        const { page = 1, limit = 8, search = "", sort = "Emp_ID" } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const query = {
            $or: [
                { Emp_ID: { $regex: new RegExp(search, 'i') } },
                { Name: { $regex: new RegExp(search, 'i') } },
                { Age: { $regex: new RegExp(search, 'i') } },
                { Contact_No: { $regex: new RegExp(search, 'i') } },
            ],
        };
        const suppliers = await Supplier.find(query)
            .sort({ [sort]: 1 })
            .skip(skip)
            .limit(parseInt(limit));
        res.status(200).json({ count: suppliers.length, data: suppliers });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

export default router;