"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdministratorController = void 0;
var SupabaseService_1 = require("../services/SupabaseService");
var SendEmailService_1 = require("../services/SendEmailService");
var adminModels_1 = require("../models/adminModels");
var AdministratorController = /** @class */ (function () {
    function AdministratorController() {
        this.supabaseService = SupabaseService_1.SupabaseService.getInstance();
        this.supabase = this.supabaseService.createdClient;
        this.sendEmailService = SendEmailService_1.SendEmailService.getInstance();
    }
    /* Function to generate a random password:
    ===========================================================================*/
    AdministratorController.prototype.generateRandomPassword = function (length) {
        var charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var password = '';
        for (var i = 0; i < length; i++) {
            var randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    };
    /* Function to create an Administrator:
        - It will generate a new password randomly.
            -- The password will have an length of 12 characters.
        - It will create the new user on Supabase Auth.
            -- With the email and password generated.
        - It will associate this new user data into the administrator database.
            -- With the email and email that comes like parameters.
    ===========================================================================*/
    AdministratorController.prototype.createAdministrator = function (adminObj) {
        return __awaiter(this, void 0, void 0, function () {
            var password, _a, data, error, _b, insertData, insertError;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        /* Setting role for admin:
                        ===================================================================*/
                        adminObj.role = 'administrator';
                        password = this.generateRandomPassword(12);
                        return [4 /*yield*/, this.supabase.auth.signUp({
                                email: adminObj.email,
                                password: password,
                            })];
                    case 1:
                        _a = _c.sent(), data = _a.data, error = _a.error;
                        if (error) {
                            return [2 /*return*/, "Error while creating user: ".concat(error.message)];
                        }
                        return [4 /*yield*/, this.supabase
                                .from('users')
                                .insert([
                                { name: adminObj.name, email: adminObj.email, phone: adminObj.phone, role: adminObj.role },
                            ])];
                    case 2:
                        _b = _c.sent(), insertData = _b.data, insertError = _b.error;
                        if (!insertError) return [3 /*break*/, 3];
                        return [2 /*return*/, 'Error inserting administrator data:' + insertError.message];
                    case 3: return [4 /*yield*/, this.sendAdminPass(adminObj.email, password)];
                    case 4:
                        _c.sent();
                        return [2 /*return*/, "Success creating administrator. \nData used: " + insertData];
                }
            });
        });
    };
    /* Function to return all the administrators:
    ===========================================================================*/
    AdministratorController.prototype.getAllAdministrators = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, data, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.supabase
                            .from('users')
                            .select('*')
                            .eq('role', 'administrator')];
                    case 1:
                        _a = _b.sent(), data = _a.data, error = _a.error;
                        if (error) {
                            return [2 /*return*/, { error: error.message }];
                        }
                        else {
                            return [2 /*return*/, data];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /* Function to return one admin by email:
    ===========================================================================*/
    AdministratorController.prototype.getAdmin = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, data, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.supabase
                            .from('users')
                            .select('*')
                            .eq('email', email)
                            .eq('role', 'administrator')
                            .single()];
                    case 1:
                        _a = _b.sent(), data = _a.data, error = _a.error;
                        if (error) {
                            // Return an object with an error key if there's an error
                            return [2 /*return*/, { error: error.message }];
                        }
                        else if (!data) {
                            // Handle the case where no matching data is found
                            return [2 /*return*/, { error: 'No administrator found with the given name.' }];
                        }
                        else {
                            // Return an object with a data key if the fetch is successful
                            return [2 /*return*/, { data: data }];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /* Function to send admin password by email:
    ===========================================================================*/
    AdministratorController.prototype.sendAdminPass = function (admEmail, password) {
        return __awaiter(this, void 0, void 0, function () {
            var imgPath, emailData;
            return __generator(this, function (_a) {
                imgPath = "../../assets/images/confluentia_logo.svg";
                emailData = {
                    to: admEmail,
                    subject: 'Confluentia - Dados de Login de Administrador',
                    html: (0, adminModels_1.createdAdminPasswordEmail)(password, imgPath),
                };
                return [2 /*return*/, this.sendEmailService.sendEmail(emailData)];
            });
        });
    };
    /* Function to edit admin data on DB:
    ===========================================================================*/
    AdministratorController.prototype.updateAdmin = function (adminObj) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, data, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        /* Setting role for admin:
                        ===================================================================*/
                        adminObj.role = 'administrator';
                        return [4 /*yield*/, this.supabase
                                .from('users')
                                .update(adminObj)
                                .eq('email', adminObj.email)
                                .single()];
                    case 1:
                        _a = _b.sent(), data = _a.data, error = _a.error;
                        if (error) {
                            return [2 /*return*/, { error: error.message }];
                        }
                        else {
                            return [2 /*return*/, data];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /* Function to delete admin data from DB:
    ===========================================================================*/
    AdministratorController.prototype.deleteAdmin = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, data, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.supabase
                            .from('users')
                            .delete()
                            .eq('email', email)];
                    case 1:
                        _a = _b.sent(), data = _a.data, error = _a.error;
                        if (error) {
                            return [2 /*return*/, { error: error.message }];
                        }
                        else {
                            return [2 /*return*/, data];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return AdministratorController;
}());
exports.AdministratorController = AdministratorController;
