import express from 'express';
import client from '../config/db.config.js';
import authenticateToken from '../middleware/authToken.js';

const app = express.Router();

/* const ratingResult = async (req, res) => {
    const { rate_count, user_name_rating } = req.body;

    try {
        await client.query('SELECT rate_count FROM rating', (error, result) => {
            let data = result.rows;

            if (!error) {
                //res.json(data)
                data.forEach((item, index) => {
                    res.json(item)
                })
            } else {
                console.error(error);
                res.json(error)
            }
        })
    } catch (error) {
        console.error(error);
        res.json(error)
        res.status(400)
        throw error
    }
}
 */
const saveRating = app.post('/', authenticateToken, async (req, res) => {
    const { rate_count, user_name_rating } = req.body;

    try {
        if (!rate_count === null && user_name_rating === null) {
            res.json({ message: 'You must input value' })
            res.status(400)
        } else {
            await client.query('INSERT INTO rating (rate_count, user_name_rating) VALUES($1, $2) RETURNING *',
                [rate_count, user_name_rating]);
            res.json({ message: 'Successfully rated!' });
            res.status(200);
        }
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
                res.json({ message: 'Error query' });
                res.status(400)
            } 
        })
    } catch (error) {
        res.json({ message: 'Error occured while acquiring results' })
        res.status(400);
        client.end;
    }
})

const resetRating = app.delete('/reset-ratings', authenticateToken, async (req, res) => {
    try {
        await client.query('TRUNCATE rating RESTART IDENTITY', (err, result) => {
            if(!err) {
                res.json({message: 'Successfully reset your portfolio ratings'})
                res.status(200)
                console.log(result)
            } else {
                res.json({message: 'Error resetting your portfolio rating results'})
                console.log(err);
            }
        })
    } catch (error) {
        res.json({message: 'Error while resetting your portfolio results'});
        res.status(400);
        client.end();
        throw error
    }
})

export default { saveRating, getRatingResults, resetRating };