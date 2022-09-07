import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import swaggerUi from 'swagger-ui-express';
import { readFile } from 'fs/promises';

import skills from './routes/skills.routes.js';
import testimonials from './routes/testimonial.routes.js';
import contact from './routes/contact.routes.js';
import rating from './routes/rating.routes.js';

const app = express();
const PORT = process.env.PORT || 80;
const swaggerJson = JSON.parse(await readFile(new URL('./swagger.json', import.meta.url)));
const whiteList = ['http://localhost:3000/', 'https://portfolio-jerome06.herokuapp.com']
const corsOptions = {
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

/* const __dirname = url.fileURLToPath(import.meta.url); */

app.listen(PORT, () => {
    console.log(`Server listening to Port ${PORT}`);
});

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());

//use public files
app.use('/', express.static('public'));
app.use(skills);
app.use(testimonials);
app.use(contact);
app.use(rating);

//documentation
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerJson));