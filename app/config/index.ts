/**
 * Centralized Configuration Setup
 * 
 * To switch between environments, change the ACTIVE_ENV variable below:
 * - 'development': Points to the Development server URL
 * - 'production': Points to the Production server URL
 */
type Environment = 'development' | 'production';

// >>> SWITCH CURRENT ENVIRONMENT HERE <<<
const ACTIVE_ENV: Environment = 'development';

const environments = {
  development: {
    BASE_URL: 'https://devbms.kalyanicrm.com/api/v1/',
    ENV_NAME: 'Development',
  },
  production: {
    BASE_URL: 'https://bms.kalyanicrm.com/api/v1/',
    ENV_NAME: 'Production',
  },
};

export const Config = environments[ACTIVE_ENV];
