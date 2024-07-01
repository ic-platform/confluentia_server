import { SupabaseService } from './services/SupabaseService';
import { AdministratorController } from './controllers/AdministratorController'; // Import the 'Supabase' module

const controller = new AdministratorController(); // Create a new instance of the 'AdministratorController' class

controller.sendAdminPass("icplatform.fumec@gmail.com", "1234567890");