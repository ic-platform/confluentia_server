/* Imports:
================================================================================*/
    import express from 'express';
    import { AdministratorController } from '../controllers/AdministratorController';
    import { adminModel } from '../models/adminModels';

/* Global Variables:
================================================================================*/
    const adminRoutes = express.Router();
    const adminController = new AdministratorController();

/* Uses Settings:
================================================================================*/
    adminRoutes.use(express.json());

/* Routes Definitions:
================================================================================*/
    /* Route to create a new Administrator:
    ============================================================================*/
        adminRoutes.post('/admin', (req: express.Request, res: express.Response) => {
            /* Extracting the adminObj from request body:
            ====================================================================*/
                const adminObj: adminModel = req.body;

            /* Validation of adminObj:
            ====================================================================*/
                if (typeof adminObj.name !== 'string' || 
                    typeof adminObj.email !== 'string' || 
                    typeof adminObj.role !== 'string' || 
                    (adminObj.phone && typeof adminObj.phone !== 'string')) {
                    
                    // Respond with an error if validation fails
                        return res.status(400).json({ 
                            message: "Invalid request data, you should follow the pattern created!" 
                        });
                }

            /* Requesting the controller to create a new administrator:
            ====================================================================*/
                adminController.createAdministrator(adminObj)
                    .then((result) => {
                        res.status(201).json({ message: result });
                    })
                    .catch((error) => {
                        res.status(500).json({ message: error });
                    });  
        });

    /* Route to Get All Admin Users:
    ============================================================================*/
        adminRoutes.get('/admin', (req: express.Request, res: express.Response) => {
            adminController.getAllAdministrators()
                .then((result) => {
                    res.status(200).json(result);
                })
                .catch((error) => {
                    res.status(500).json({ message: error });
                });
        });

    /* Route to Get an Admin User by email:
    ============================================================================*/
        adminRoutes.get('/admin/:email', (req: express.Request, res: express.Response) => {
            const email = req.params.email;

            adminController.getAdmin(email)
                .then((result) => {
                    res.status(200).json(result);
                })
                .catch((error) => {
                    res.status(500).json({ message: error });
                });
        });

    /* Route to Update an Admin:
    ============================================================================*/
        adminRoutes.put('/admin', (req: express.Request, res: express.Response) => {
            const adminObj: adminModel = req.body;

            adminController.updateAdmin(adminObj)
                .then((result) => {
                    res.status(200).json({ message: result });
                })
                .catch((error) => {
                    res.status(500).json({ message: error });
                });
        });
    
    /* Route to Delete an Admin:
    ============================================================================*/
        adminRoutes.delete('/admin/:email', (req: express.Request, res: express.Response) => {
            const email = req.params.email;

            adminController.deleteAdmin(email)
                .then((result) => {
                    res.status(200).json({ message: result });
                })
                .catch((error) => {
                    res.status(500).json({ message: error });
                });
        });

export default adminRoutes;