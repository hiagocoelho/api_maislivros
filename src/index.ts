import {createConnection} from "typeorm";
import express from 'express';
import cors from 'cors';

import bookRouter from "./routers/bookRouter";

createConnection().then(() => {
    const app = express();

    app.use(cors());
    
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/api/books', bookRouter);
    
    app.use((req, res) => {
        res.sendStatus(404);
    });

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`O servidor da MaisLivros está ativo na porta (${PORT})`);
    });
});
