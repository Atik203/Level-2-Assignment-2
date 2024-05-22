/*
 * Title: Config File
 * Description: dotenv configuration file
 * Author: Md. Atikur Rahaman
 * Date: 22-05-2024
 */

import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
};
