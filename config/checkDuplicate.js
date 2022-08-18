import authenticateToken from "../middleware/authToken";
import client from "./db.config";
import express from "express";

const app = express.Router();

const checkSkill = (skill_name, skill_description) => {
    client.query('SELECT * FROM skills WHERE ')
};

export default checkSkill;