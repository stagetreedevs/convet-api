/* eslint-disable prettier/prettier */
import { environment } from "./environment";
export const config = () => ({
    port: Number(environment.PORT),
    url: process.env.DB_URL
});