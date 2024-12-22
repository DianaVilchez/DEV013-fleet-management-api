"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer = require('nodemailer');
require('dotenv').config();
// const path = require('path');
// import fs from 'fs'
exports.transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PWD
    }
});
exports.transporter.verify().then(() => {
    console.log('Ready send emails');
});
