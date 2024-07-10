import express from 'express';
import { PlatformController } from '../controllers/PlatformController';
import { carrosselModel, meetUsDescriptionModel, meetUsModel, teamModel, termsOfUseModel } from '../models/platformModels';

const platformRoutes = express.Router();
const platformController = new PlatformController(); 

// Login Routes:
platformRoutes.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const result = await platformController.loginUser(email, password);
    res.json(result);
});

// Logout Routes:
platformRoutes.get('/logout', async (req, res) => {
    const result = await platformController.logoutUser();
    res.json(result);
});

// Carrossel Routes
platformRoutes.get('/carrossel', async (req, res) => {
    const result = await platformController.getAllCarrossel();
    res.json(result);
});

platformRoutes.put('/carrossel/:id', async (req, res) => {
    const carrosselId = parseInt(req.params.id);
    const carrosselObj: carrosselModel = req.body;
    const result = await platformController.updateCarrossel(carrosselId, carrosselObj);
    res.json(result);
});

platformRoutes.delete('/carrossel/:id', async (req, res) => {
    const carrosselId = parseInt(req.params.id);
    const result = await platformController.deleteCarrossel(carrosselId);
    res.json(result);
});

platformRoutes.post('/carrossel', async (req, res) => {
    const carrosselObj: carrosselModel = req.body;
    const result = await platformController.createCarrossel(carrosselObj);
    res.json(result);
});

// Meet Us Routes
platformRoutes.get('/meet-us', async (req, res) => {
    const result = await platformController.getMeetUs();
    res.json(result);
});

platformRoutes.put('/meet-us', async (req, res) => {
    const meetUsObj: meetUsModel = req.body;
    const result = await platformController.updateMeetUs(meetUsObj);
    res.json(result);
});

platformRoutes.put('/meet-us/description', async (req, res) => {
    const meetUsObj: meetUsDescriptionModel = req.body;
    const result = await platformController.updateMeetUsDescription(meetUsObj);
    res.json(result);
});

platformRoutes.delete('/meet-us', async (req, res) => {
    const result = await platformController.deleteMeetUs();
    res.json(result);
});

platformRoutes.post('/meet-us', async (req, res) => {
    const meetUsObj: meetUsModel = req.body;
    const result = await platformController.createMeetUs(meetUsObj);
    res.json(result);
});

// Team Routes
platformRoutes.get('/team', async (req, res) => {
    const result = await platformController.getTeam();
    res.json(result);
});

platformRoutes.put('/team/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const teamObj: teamModel = req.body;
    const result = await platformController.updatePersonTeam(id, teamObj);
    res.json(result);
});

platformRoutes.delete('/team/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await platformController.deletePersonTeam(id);
    res.json(result);
});

platformRoutes.post('/team', async (req, res) => {
    const teamObj: teamModel = req.body;
    const result = await platformController.createPersonTeam(teamObj);
    res.json(result);
});

// Terms of Use Routes
platformRoutes.get('/terms', async (req, res) => {
    const result = await platformController.getTermsOfUse();
    res.json(result);
});

platformRoutes.put('/terms', async (req, res) => {
    const termsOfUseObj: termsOfUseModel = req.body;
    const result = await platformController.updateTermsOfUse(termsOfUseObj);
    res.json(result);
});

platformRoutes.delete('/terms', async (req, res) => {
    const result = await platformController.deleteTermsOfUse();
    res.json(result);
});

platformRoutes.post('/terms', async (req, res) => {
    const termsOfUseObj: termsOfUseModel = req.body;
    const result = await platformController.createTermsOfUse(termsOfUseObj);
    res.json(result);
});

export default platformRoutes;