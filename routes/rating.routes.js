import express from "express";
import ratingController from "../controller/rating.controller.js";
import authenticateToken from "../middleware/authToken.js";

const app = express.Router()

app.use('/rating', ratingController.saveRating);
app.use('/rating', ratingController.getRatingResults);
app.use('/rating', ratingController.resetRating);
//app.get('/rating/result', authenticateToken ,ratingController.ratingResult);

export default app