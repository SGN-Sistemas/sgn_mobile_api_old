export {}
declare global {
    namespace Express {
        export interface Request {
            user_cod: string;
            database: string;
            user_sigla: string;
        }
    }
}
