/* Imports:
================================================================================*/
import express from 'express';
import { CourseController } from '../controllers/CourseController'; // Assuming the CourseController file is in a directory named controllers
import { courseModel, moduleModel, lessonsModel } from '../models/courseModels'; // Assuming the models are in a directory named models

/* Global Variables:
================================================================================*/
const courseRoutes = express.Router(); // Changed router to courseRoutes
const courseController = new CourseController();

/* Middleware:
================================================================================*/
courseRoutes.use(express.json());

/* Routes Definitions:
================================================================================*/

/* Courses Routes:
================================================================================*/
    /* Create a Course:
    ============================================================================*/
    courseRoutes.post('/courses', (req: express.Request, res: express.Response) => {
        const course: courseModel = req.body; // Ensure the request body is of type courseModel
        courseController.createCourse(course)
            .then((result) => res.json(result))
            .catch((err) => res.status(500).json({ error: err.message }));
    });

    /* Get All Courses:
    ============================================================================*/
    courseRoutes.get('/courses', (req, res) => {
        courseController.getAllCourses()
            .then((result) => res.json(result))
            .catch((err) => res.status(500).json({ error: err.message }));
    });

    /* Get a Course by ID:
    ============================================================================*/
    courseRoutes.get('/courses/:id', (req, res) => {
        courseController.getCourseById(parseInt(req.params.id))
            .then((result) => res.json(result))
            .catch((err) => res.status(500).json({ error: err.message }));
    });

    /* Update a Course:
    ============================================================================*/
    courseRoutes.put('/courses/:id', (req, res) => {
        const course: courseModel = req.body; // Ensure the request body is of type courseModel
        courseController.updateCourse(parseInt(req.params.id), course)
            .then((result) => res.json(result))
            .catch((err) => res.status(500).json({ error: err.message }));
    });

    /* Delete a Course:
    ============================================================================*/
    courseRoutes.delete('/courses/:id', (req, res) => {
        courseController.deleteCourse(parseInt(req.params.id))
            .then((result) => res.json(result))
            .catch((err) => res.status(500).json({ error: err.message }));
    });

/* Modules Routes:
================================================================================*/
    /* Create a Module:
    ============================================================================*/
    courseRoutes.post('/modules', (req: express.Request, res: express.Response) => {
        const module: moduleModel = req.body; // Ensure the request body is of type moduleModel
        courseController.createModule(module)
            .then((result) => res.json(result))
            .catch((err) => res.status(500).json({ error: err.message }));
    });

    /* Get All Modules:
    ============================================================================*/
    courseRoutes.get('/modules', (req, res) => {
        courseController.getAllModules()
            .then((result) => res.json(result))
            .catch((err) => res.status(500).json({ error: err.message }));
    });

    /* Get a Module by ID:
    ============================================================================*/
    courseRoutes.get('/modules/:id', (req, res) => {
        courseController.getModuleById(parseInt(req.params.id))
            .then((result) => res.json(result))
            .catch((err) => res.status(500).json({ error: err.message }));
    });

    /* Update a Module:
    ============================================================================*/
    courseRoutes.put('/modules/:id', (req, res) => {
        const module: moduleModel = req.body; // Ensure the request body is of type moduleModel
        courseController.updateModule(parseInt(req.params.id), module)
            .then((result) => res.json(result))
            .catch((err) => res.status(500).json({ error: err.message }));
    });

    /* Delete a Module:
    ============================================================================*/
    courseRoutes.delete('/modules/:id', (req, res) => {
        courseController.deleteModule(parseInt(req.params.id))
            .then((result) => res.json(result))
            .catch((err) => res.status(500).json({ error: err.message }));
    });

/* Lessons Routes:
================================================================================*/
    /* Create a Lesson:
    ============================================================================*/
    courseRoutes.post('/lessons', (req: express.Request, res: express.Response) => {
        const lesson: lessonsModel = req.body; // Ensure the request body is of type lessonsModel
        courseController.createLesson(lesson)
            .then((result) => res.json(result))
            .catch((err) => res.status(500).json({ error: err.message }));
    });

    /* Get All Lessons:
    ============================================================================*/
    courseRoutes.get('/lessons', (req, res) => {
        courseController.getAllLessons()
            .then((result) => res.json(result))
            .catch((err) => res.status(500).json({ error: err.message }));
    });

    /* Get a Lesson by ID:
    ============================================================================*/
    courseRoutes.get('/lessons/:id', (req, res) => {
        courseController.getLessonById(parseInt(req.params.id))
            .then((result) => res.json(result))
            .catch((err) => res.status(500).json({ error: err.message }));
    });

    /* Update a Lesson:
    ============================================================================*/
    courseRoutes.put('/lessons/:id', (req, res) => {
        const lesson: lessonsModel = req.body; // Ensure the request body is of type lessonsModel
        courseController.updateLesson(parseInt(req.params.id), lesson)
            .then((result) => res.json(result))
            .catch((err) => res.status(500).json({ error: err.message }));
    });

    /* Delete a Lesson:
    ============================================================================*/
    courseRoutes.delete('/lessons/:id', (req, res) => {
        courseController.deleteLesson(parseInt(req.params.id))
            .then((result) => res.json(result))
            .catch((err) => res.status(500).json({ error: err.message }));
    });

    /* Get All Levels:
    ===========================================================================*/
    courseRoutes.get('/levels', (req, res) => {
        courseController.getLevels()
            .then((result) => res.json(result))
            .catch((err) => res.status(500).json({ error: err.message }));
    });

    /* Update a Level:
    ===========================================================================*/
    courseRoutes.put('/levels/:id', (req: express.Request, res: express.Response) => {
        const level = req.body; // Assuming level has a similar structure to courseModel, moduleModel, lessonsModel
        courseController.updateLevel(parseInt(req.params.id), level)
            .then((result) => res.json(result))
            .catch((err) => res.status(500).json({ error: err.message }));
    });

    /* Delete a Level:
    ===========================================================================*/
    courseRoutes.delete('/levels/:id', (req, res) => {
        courseController.deleteLevel(parseInt(req.params.id))
            .then((result) => res.json(result))
            .catch((err) => res.status(500).json({ error: err.message }));
    });

/* Export the router:
================================================================================*/
export default courseRoutes;