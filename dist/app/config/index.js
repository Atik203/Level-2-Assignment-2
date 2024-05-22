"use strict";
/*
 * Title: Config File
 * Description: dotenv configuration file
 * Author: Md. Atikur Rahaman
 * Date: 22-05-2024
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
};
