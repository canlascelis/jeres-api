import express from 'express';
import nodemailer from 'nodemailer';
import emailConfig from '../config/email.config.js';

const app = express.Router();

const sendEmail = app.post('/', (req, res) => {

    // according to docus it create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: emailConfig.username,
            pass: emailConfig.password,
        },
    })

    let mailOptions = {
        from: `Jeres portfolio ${req.body.email}`, // sender address
        to: "canlascelis@gmail.com", // list of receivers
        subject: "Email from your portfolio", // Subject line
        html: `<h3>Contact Details</h3>
                <ul>
                    <li>Name: ${req.body.name}</li>
                    <li>Company: ${req.body.company}</li>
                    <li>Email: ${req.body.email}</li>
                    <li>Phone: ${req.body.phone}</li>
                </ul>
                <h3>Message</h3>
                <p>${req.body.message}</p>`
                    , // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.send('Error occured while sending email', error)
        } else {
            res.send('Email sent')
        }
    })
})

export default { sendEmail }