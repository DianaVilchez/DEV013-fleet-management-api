const nodemailer = require('nodemailer');
require('dotenv').config();
// const path = require('path');
// import fs from 'fs'

 export const  transporter = nodemailer.createTransport({

    host: process.env.SMTP_HOST,
    port: 465,
    secure: true, 
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PWD
    }
})

transporter.verify().then(() => {
    console.log('Ready send emails')
})