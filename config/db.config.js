import Client from "pg/lib/client.js";

const connectionString = `postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@localhost:5432/${process.env.PG_DATABASE}`;

const client = new Client({
    host: process.env.PG_HOST || "localhost",
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    connectionString: process.env.DATABASE_URL || connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

//check connection
client.connect(err => {
    if(err) {
        console.error("connection error", err.stack)
    } else {
        console.log(`Connected to Database ${client.database}`);
    }
});

export default client;