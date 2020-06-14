const env = process.env.NODE_ENV || "development";
const configFileName = `${env}.config.json`;
const config = require(`./${configFileName}`);

export default config;
