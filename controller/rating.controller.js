import express from 'express';
import client from '../config/db.config.js';
import authenticateToken from '../middleware/authToken.js';

const app = express.Router();

const saveRating = app.post('/', authenticateToken, async (req, res) => {
    const { rate_count, user_name_rating } = req.body;

    try {
        await client.query('INSERT INTO rating (rate_count, user_name_rating) VALUES($1, $2) RETURNING *',
            [rate_count, user_name_rating]);
        res.json({ message: 'Successfully rated!' });
        res.status(200);
    } catch (error) {
        res.json({ message: 'Error occured!' });
        res.status(400);
    }

});

const getRatingResults = app.get('/', authenticateToken, async (req, res) => {
    try {
        await client.query('SELECT * FROM rating', (error, result) => {
            if (!error) {
                res.json(result.rows);
                res.status(200);
            } else {
                res.json({message: 'Error'});
                res.status(401)
            }
        })
    } catch (error) {
        res.json({ message: 'Error occured while acquiring results' })
        res.status(400);
        client.end;
    }
})

export default { saveRating };