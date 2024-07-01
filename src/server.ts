/* Imports:
================================================================================*/
    import express, { NextFunction } from 'express';
    import cors from 'cors';
    import * as dotenv from 'dotenv';

/* Global Configs:
================================================================================*/
    dotenv.config();

/* Global Variables:
================================================================================*/
    const app = express();
    const port = process.env.PORT || 3005;

/* App Config:
================================================================================*/
    /* Cors Config:
    ============================================================================*/
        app.use(cors());

/* Server Configuration:
================================================================================*/
    /* Routes Configuration:
    ============================================================================*/
        app.get('/', (req, res) => {
            res.send('Hello World!');
        });

    /* Error Handler:
    ============================================================================*/
        app.use((err: any, req: express.Request, res: express.Response, next: NextFunction) => {
            console.error(err.stack);
            res.status(500).send('Something broke!');
        });

    /* Not Found Handler:
    ============================================================================*/
        app.use((req: express.Request, res: express.Response, next: NextFunction) => {
            res.status(404).send("Sorry can't find that!");
        });

/* App Port:
================================================================================*/
    app.listen(port, () => {
        console.log(`Servidor está rodando na porta ${port}`);
    });