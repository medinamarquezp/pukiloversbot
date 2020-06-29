const env = process.env.NODE_ENV || "development";
const configFileName = `${env}.config.js`;
const config = require(`./${configFileName}`);

export default config;
