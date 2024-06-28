"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseService = void 0;
var supabase_js_1 = require("@supabase/supabase-js");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var SupabaseService = /** @class */ (function () {
    /* Constructor:
    ============================================================================*/
    function SupabaseService() {
        this.supabaseUrl = process.env.SUPABASE_URL || '';
        this.supabaseKey = process.env.SUPABASE_KEY || '';
        this.supabase = (0, supabase_js_1.createClient)(this.supabaseUrl, this.supabaseKey);
    }
    /* Singleton:
    ============================================================================*/
    SupabaseService.getInstance = function () {
        if (!SupabaseService.instance) {
            SupabaseService.instance = new SupabaseService();
        }
        return SupabaseService.instance;
    };
    Object.defineProperty(SupabaseService.prototype, "createdClient", {
        /* Getting the client created on constructor:
        ============================================================================*/
        get: function () {
            return this.supabase;
        },
        enumerable: false,
        configurable: true
    });
    return SupabaseService;
}());
exports.SupabaseService = SupabaseService;
