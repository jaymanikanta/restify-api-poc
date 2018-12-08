// Import modules
const errors = require("restify-errors"); //restify errors module
const Customer = require("../models/Customer");

// A basic customers route
module.exports = server => {
  // GET request for all customers records
  server.get("/customers", async (req, res, next) => {
    try {
      const customers = await Customer.find({});
      res.send(customers);
      next();
    } catch (err) {
      return next(new errors.InvalidContentError(err));
    }
  });
};
