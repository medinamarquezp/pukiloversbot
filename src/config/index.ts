const env = process.env.NODE_ENV || "development";
const configFileName = `${env}.config.ts`;
const config = require(`./${configFileName}`);

export default config;
