const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  FLIGHT_SEVICE_PATH: process.env.FLIGHT_SEVICE_PATH,
};
