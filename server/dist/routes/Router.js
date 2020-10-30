"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const express_1 = __importDefault(require("express"));
class Router {
    static get instance() {
        if (!Router.staticInstance) {
            Router.staticInstance = express_1.default.Router();
        }
        return Router.staticInstance;
    }
}
exports.Router = Router;
//# sourceMappingURL=Router.js.map