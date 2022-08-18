import client from '../config/db.config.js';
import express from 'express';
import authenticateToken from '../middleware/authToken.js';

const app = express.Router();

const getTestimonial = app.get('/', authenticateToken, async (req, res) => {
    try {
        await client.query('SELECT * FROM testimonials WHERE is_deleted = false', (error, result) => {
            if (error) res.json(error);
            res.json(result.rows);
            res.status(200)
        });
    } catch (err) {
        console.error(err);
    } finally {
        client.end;
    }
});

const addTestimonial = app.post('/', authenticateToken, async (req, res) => {
    try {
        const { testimonial_name, testimonial_description } = req.body;

        if (testimonial_name == null && testimonial_description == null) {
            res.status(400);
            res.send({ message: 'Must input value!' })
        } else {
            await client.query('INSERT INTO testimonials (testimonial_name, testimonial_description) VALUES($1, $2) RETURNING *',
                [testimonial_name, testimonial_description]);

            res.json({ message: 'Successfully added testimonial' });
            res.status(200);
        }
    } catch (error) {
        res.json({ message: error });
        throw error;
    } finally {
        client.end;
    }
});

const hardDelete = app.delete('/:testimonial_id', authenticateToken, async (req, res) => {
    try {
        //NOTE: error when req.params.[testimonial_id]; removed
        const testimonial_id = req.params.testimonial_id;
        const deleteQuery = "DELETE FROM testimonials WHERE testimonial_id = $1";

        await client.query(deleteQuery, [testimonial_id]);

        res.status(200);
        res.send({ message: 'Successfully Deleted!' });
    } catch (error) {
        console.log(error);
        res.json({ message: 'Error occured' })
        res.status(400);
    } finally {
        client.end;
    }
});

export default { getTestimonial, addTestimonial, hardDelete };