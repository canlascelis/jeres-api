import express from "express";
import skillsController from "../controller/skills.controller.js";

const app = express.Router();

// const getSkillsRouter = app.use('/skills', skillsController.getSkills);
// const addSkillRouter = app.use('/skills', skillsController.addSkill);
// const softDeleteRouter = app.use('/skills', skillsController.softDeleteSkill);

// export default { getSkillsRouter, addSkillRouter, softDeleteRouter };

app.use('/skills', skillsController.getSkills);
app.use('/skills', skillsController.addSkill);
app.use('/skills', skillsController.softDeleteSkill);

export default app;