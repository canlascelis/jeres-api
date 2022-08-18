import client from '../config/db.config.js';
import express from 'express';
import Jwt from 'jsonwebtoken';

//middleware
import authenticateToken from '../middleware/authToken.js';

const app = express.Router();

// const accessToken = process.env.ACCESS_TOKEN_SECRET;

const getSkills = app.get('/', authenticateToken, async (req, res) => {
    try {
        await client.query('SELECT * FROM skills', (error, result) => {
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

const addSkill = app.post('/', authenticateToken, async (req, res) => {

    try {
        const { skill_name, skill_description } = req.body;

        await client.query('INSERT INTO skills (skill_name, skill_description) VALUES($1, $2) RETURNING *',
            [skill_name, skill_description]);
            res.json({message: "Successfully added!"});
            res.status(200);
    } catch (err) {
        console.error(err.stack);
    } finally {
        client.end;
    }
});

//hard delete
const hardDeleteSkill = app.delete('/', authenticateToken, (req, res) => {
    try {
        const id = req.headers;


    } catch (error) {
        
    }
});

//soft delete
const softDeleteSkill = app.put('/:skill_id', authenticateToken, async (req, res) => {
    try {
        const id = req.params;
        await client.query('UPDATE skills SET is_deleted = $1 WHERE skill_id = $2',["t", id])
        res.status(200);
        res.json({message: `${id} Deleted!`})
    } catch (error) {
        res.json(error)
    } finally {
        client.end;
    }
})

export default { getSkills, addSkill, softDeleteSkill };