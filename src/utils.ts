import * as dotenv from 'dotenv';

dotenv.config();
const STAGE = process.env.STAGE;

export const setupConfigurationValues = async () => {
  if (STAGE === 'local') return;
};
