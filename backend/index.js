import path from 'path';
import express from 'express';
import * as url from 'url';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import router from './utils/routes.js';

const app = express();

config();

app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.resolve(url.fileURLToPath(new URL('.', import.meta.url), 'uploads'))))

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use('/api/', router);


app.listen(4000, () => {
    console.log('Server running on Port 4000...')
})