const env = process.env.NODE_ENV || "development";
const ext = (env === "test") ? 'ts' : 'js'

const configFileName = `${env}.config.${ext}`;
const config = require(`./${configFileName}`);

export default config;
