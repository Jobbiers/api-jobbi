import dotenv from 'dotenv';
dotenv.config();

export const {
    DB_HOST,
    DB_NAME,
    DB_PORT,
    DB_USER,
    DB_PASS,
    NODE_ENV,
    PORT
} = process.env;
