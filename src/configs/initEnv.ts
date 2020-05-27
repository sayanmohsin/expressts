import * as dotenv from "dotenv";

let path;

path = `${__dirname}/../../.env`;
dotenv.config({ path: path });
const env: string = process.env.NODE_ENV || 'development';
switch (env) {
    case "production":
        path = `${__dirname}/../../.env.production`;
        break;
    default:
        path = `${__dirname}/../../.env.development`;
}
dotenv.config({ path: path });