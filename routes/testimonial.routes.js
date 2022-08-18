import express from "express";
import testimonialController from "../controller/testimonial.controller.js";

const app = express.Router();

/* const getTestimonial = app.use('/testimonials', testimonialController.getTestimonial);
const addTestimonial = app.use('/testimonials', testimonialController.addTestimonial);

export default { getTestimonial, addTestimonial }; */

app.use('/testimonials', testimonialController.getTestimonial);
app.use('/testimonials', testimonialController.addTestimonial);
app.use('/testimonials', testimonialController.hardDelete);

export default app;