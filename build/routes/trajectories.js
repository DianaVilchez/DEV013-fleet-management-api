"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import express from 'express'
const express_1 = require("express");
const trajectories_1 = require("../controllers/trajectories");
// cada router que se exporta es diferente aun asi tenga el mismo nombre
const router = (0, express_1.Router)();
router.get('/trajectories' /*,middleware*/, trajectories_1.getTrajectories);
exports.default = router;
