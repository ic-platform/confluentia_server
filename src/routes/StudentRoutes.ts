// src/routes/StudentRoutes.ts
import express from 'express';
import { StudentController } from '../controllers/StudentController';
import { createStudentModel, editStudentModel } from '../models/studentModels';

const studentRoutes = express.Router();
const studentController = new StudentController();

// Create a new student
studentRoutes.post('/student', async (req, res) => {
    const studentObj: createStudentModel = req.body;
    const result = await studentController.createStudent(studentObj);
    res.json(result);
});

// Get a student by name or email
studentRoutes.get('/student', async (req, res) => {
    const name = req.query.name as string;
    const email = req.query.email as string;
    const result = await studentController.getStudent(name, email);
    res.json(result);
});

// Get all students
studentRoutes.get('/student/all', async (req, res) => {
    const result = await studentController.getAllStudents();
    res.json(result);
});

// Update a student
studentRoutes.put('/student', async (req, res) => {
    const studentObj: editStudentModel = req.body;
    const result = await studentController.updateStudent(studentObj);
    res.json(result);
});

// Delete a student
studentRoutes.delete('/student', async (req, res) => {
    const email = req.query.email as string;
    const result = await studentController.deleteStudent(email);
    res.json(result);
});

export default studentRoutes;
