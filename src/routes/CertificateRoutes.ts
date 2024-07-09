// src/routes/CertificateRoutes.ts
import express from 'express';
import { CertificateController } from '../controllers/CertificateController';
import { createCertificateModel } from '../models/certificateModels';

const certificateRoutes = express.Router();
const certificateController = new CertificateController();

// Create a new certificate
certificateRoutes.post('/certificate', async (req, res) => {
    const createCertificateObj: createCertificateModel = req.body;
    const result = await certificateController.createCertificate(createCertificateObj);
    res.json(result);
});

// Get certificates by student ID
certificateRoutes.get('/certificate/:studentId', async (req, res) => {
    const studentId = parseInt(req.params.studentId);
    const result = await certificateController.getCertificatesByStudentId(studentId);
    res.json(result);
});

// Get certificates by course ID
certificateRoutes.get('/certificate/:courseId', async (req, res) => {
    const courseId = parseInt(req.params.courseId);
    const result = await certificateController.getCertificatesByCourseId(courseId);
    res.json(result);
});

// Get certificate by code
certificateRoutes.get('/certificate/:certificateCode', async (req, res) => {
    const certificateCode = req.params.certificateCode;
    const result = await certificateController.getCertificateByCode(certificateCode);
    res.json(result);
});

export default certificateRoutes;
