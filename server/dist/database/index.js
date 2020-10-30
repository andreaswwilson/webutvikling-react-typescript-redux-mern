"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = void 0;
const mongoose_1 = require("mongoose");
const models_1 = require("../models");
class DB {
    constructor() {
        this.connectionOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            user: 'admin',
            pass: 'admin',
        };
        mongoose_1.connect('mongodb://it2810-32.idi.ntnu.no:27017/Project3?authSource=admin', this.connectionOptions);
        this._db = mongoose_1.connection;
        this._db.on('open', this.connected);
        this._db.on('error', this.error);
        this._models = {
            Movie: new models_1.Movie().model,
        };
    }
    static get Models() {
        if (!DB.instance) {
            DB.instance = new DB();
        }
        return DB.instance._models;
    }
    connected() {
        console.log('Connected to database');
    }
    error(error) {
        console.log('Error connection to database: ', error);
    }
}
exports.DB = DB;
//# sourceMappingURL=index.js.map