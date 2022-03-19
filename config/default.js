const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  secret: "hello-kitty",
  mongo: {
    uri: null,
  },
  firebase: {
    serviceAccount: null,
  },
  redis: {
    url: "redis://localhost:6379",
  },
};
