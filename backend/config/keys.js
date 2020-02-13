const DB_NAME = "test";


module.exports = {
    // this port number is determined by looking at mongod's output`
    mongoURI: `mongodb://localhost:27017/${DB_NAME}`,
    secretOrKey: "secret",
};
