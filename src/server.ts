/* Imports:
================================================================================*/
    import express from 'express';
    import cors from 'cors';
    import bodyParser from 'body-parser';
    import * as dotenv from 'dotenv';
    import { Administrator } from './administrator';
    import { Certificate } from './Certificate';
    import { Course } from './Course';
    import { Platform } from './Platform';
    import { Student } from './Student';

/* Global Configs:
================================================================================*/
    dotenv.config();

/* Global Variables:
================================================================================*/
    const app = express();
    const port = process.env.PORT || 3005;

/* App Config:
================================================================================*/
    /* Body Parser:
    ============================================================================*/
        app.use(bodyParser.json());

    /* Cors Config:
    ============================================================================*/
        app.use(cors());

/* Server Configuration:
================================================================================*/
    /* Routes:
    ============================================================================*/
        app.get('/', (req, res) => {
            res.send('Hello World!');
        });

    /* Error Handler:
    ============================================================================*/
        app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).send('Something broke!');
        });

    /* Not Found Handler:
    ============================================================================*/
        app.use((req, res, next) => {
            res.status(404).send("Sorry can't find that!");
        });

/* App Port:
================================================================================*/
    app.listen(port, () => {
        console.log(`Servidor está rodando na porta ${port}`);
    });