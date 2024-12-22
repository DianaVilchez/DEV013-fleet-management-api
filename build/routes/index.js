"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
// import express from 'express'
const express_1 = require("express");
const taxis_1 = __importDefault(require("../routes/taxis"));
const trajectories_1 = __importDefault(require("../routes/trajectories"));
// import { readdirSync } from 'fs';
// dirname : devuelve la ruta actual
// const PATH_ROUTER =`${__dirname}`;
const router = (0, express_1.Router)();
exports.router = router;
router.use('/', taxis_1.default);
router.use('/', trajectories_1.default);
