import express from 'express';
import { Employee } from '../models/employeeModel.js';

const router = express.Router();

router.post('/', async (request, response) => {
    try {
        const newEmployee = {
            Emp_ID: request.body.Emp_ID,
            Name: request.body.Name,
            Age: request.body.Age,
            Job_Role: request.body.Job_Role,
            Contact_No: request.body.Contact_No,
            Salary: request.body.Salary,
        };
        const employee = await Employee.create(newEmployee);
        return response.status(201).send(employee);
    } catch (error) {
        console.error(error.message); 
        return response.status(500).send({ message: "Internal Server Error" });
    }
});

router.get('/', async (request, response) => {
    try {
        const employees = await Employee.find({});
        return response.status(200).json({
            count: employees.length,
            data: employees
        });
    } catch (error) {
        console.error(error.message); 
        return response.status(500).send({ message: "Internal Server Error" });
    }
});

router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const employee = await Employee.findById(id);
        return response.status(200).json(employee);
    } catch (error) {
        console.error(error.message); 
        return response.status(500).send({ message: "Internal Server Error" });
    }
});

router.put('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Employee.findByIdAndUpdate(id, request.body);
        if (!result) {
            return response.status(400).json({ message: 'Employee not found' });
        }
        return response.status(200).send({ message: 'Employee updated successfully' });
    } catch (error) {
        console.error(error.message); 
        return response.status(500).send({ message: "Internal Server Error" });
    }
});

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Employee.findByIdAndDelete(id);
        if (!result) {
            return response.status(400).json({ message: 'Employee not found' });
        }
        return response.status(200).send({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.error(error.message); 
        return response.status(500).send({ message: "Internal Server Error" });
    }
});

router.get("/searchEmployee", async (req, res) => {
    try {
        const { page = 1, limit = 8, search = "", sort = "Emp_ID" } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const query = {
            $or: [
                { Emp_ID: { $regex: new RegExp(search, 'i') } },
                { Name: { $regex: new RegExp(search, 'i') } },
                { Age: { $regex: new RegExp(search, 'i') } },
                { Job_Role: { $regex: new RegExp(search, 'i') } },
                { Contact_No: { $regex: new RegExp(search, 'i') } },
                { Salary: { $regex: new RegExp(search, 'i') } },
            ],
        };
        const employees = await Employee.find(query)
            .sort({ [sort]: 1 })
            .skip(skip)
            .limit(parseInt(limit));
        res.status(200).json({ count: employees.length, data: employees });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

export default router;
