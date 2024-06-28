"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AdministratorController_1 = require("./controllers/AdministratorController"); // Import the 'Supabase' module
var controller = new AdministratorController_1.AdministratorController(); // Create a new instance of the 'AdministratorController' class
controller.sendAdminPass("icplatform.fumec@gmail.com", "1234567890");
