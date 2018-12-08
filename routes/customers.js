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

  // Add customers
  server.post("/customers", async (req, res, next) => {
    // Check whether we are passing JSON
    if (!req.is("application/json")) {
      return next(
        new errors.InvalidContentError("Expects an 'application/json' value")
      );
    }

    // Objects for customer creation
    const { name, email, balance } = req.body;

    // Create an object of Customer model
    const customer = new Customer({
      name,
      email,
      balance
    });

    try {
      const newCustomer = await customer.save();
      res.send(201);
      next();
    } catch (err) {
      return next(new errors.InternalError(err.message));
    }
  });
};
