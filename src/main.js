import express from 'express';
import 'dotenv/config';

const app = express();

app.listen(process.env.PORT, () => {
    console.log(`> Servidor iniciado en la url: http://${process.env.DOMAIN}:${process.env.PORT}/`);
})