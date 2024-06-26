"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import taxisRouter from './routes/taxis'
const app = (0, express_1.default)();
app.use(express_1.default.json()); //middleware tranforma la req.body a un json
const PORT = 3000;
//endpoint
app.get('/ping', (_req, res) => {
    console.log('someone pinged here!!');
    res.send('pong');
});
// app.use('/api',taxisRouter )
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
