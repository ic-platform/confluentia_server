/* Imports:
================================================================================*/
    import express, { NextFunction } from 'express';
    import cors from 'cors';
    import * as dotenv from 'dotenv';
    import adminRoutes  from "./routes/AdministratorRoutes";
    import courseRoutes from './routes/CourseRoutes';
    import certificateRoutes from './routes/CertificateRoutes';
    import contactRoutes from './routes/ContactRoutes';
    import platformRoutes from './routes/PlatformRoutes';
    import studentRoutes from './routes/StudentRoutes';

/* Global Configs:
================================================================================*/
    dotenv.config();

/* Global Variables:
================================================================================*/
    const app = express();
    const port = process.env.PORT || 3005;

/* App Config:
================================================================================*/
    /* Body Parser Config:
    ============================================================================*/
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

    /* Cors Config:
    ============================================================================*/
        app.use(cors({
            origin: [
                'http://localhost',
                'http://localhost:4200', 
                'https://confluentia.vercel.app', 
                'https://confluentia-henry-alt.vercel.app', 
                "https://confluentia-bela-alt.vercel.app", 
                "https://confluentia-qa-testing.vercel.app",
                "*"
            ],
            methods: ['GET', 'POST', 'PUT', 'DELETE']
        }));

/* Server Configuration:
================================================================================*/
    /* Routes Configuration:
    ============================================================================*/
        app.get('/', (req, res) => {
            res.send('Hello World! Welcome to Confluentia Server :)');
        });

        app.use(adminRoutes);
        app.use(courseRoutes);
        app.use(certificateRoutes);
        app.use(contactRoutes);
        app.use(platformRoutes);
        app.use(studentRoutes);

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