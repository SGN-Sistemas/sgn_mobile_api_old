import * as express from 'express'
declare global {
    namespace Express {
        export interface Request {
            user_cod: string;
            database: string;
        }
    }
}
