import express from "express";
import ratingController from "../controller/rating.controller.js";

const app = express.Router()

app.use('/rating', ratingController.saveRating);
app.use('/rating', ratingController.getRatingResults)

export default app