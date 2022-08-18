import contactController from "../controller/contact.controller.js";
import express from "express";

const app = express.Router()

app.use('/contact', contactController.sendEmail);

export default app