"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const port = 5000;
const movies_1 = __importDefault(require("./routes/api/movies"));
const cors_1 = __importDefault(require("cors"));
app.use(express_1.default.json());
app.use(cors_1.default());
app.use('/api/movies', movies_1.default);
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map