/*
 * Title: Server File
 * Description: Server file for the project
 * Author: Md. Atikur Rahaman
 * Date: 22-05-2024
 */

import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log(`app listening on port ${config.port}`);
    });
  } catch (error) {
    console.error('Error occurred: ', error);
  }
}

main();
