// Import modules
const errors = require("restify-errors"); // restify errors module
const Customer = require("../models/Customer"); // importing customer from Customer model

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

  // Declaring an id with type string
  //const id = "";
  // GET request for finding a particular customer with ID
  server.get("/customers/:id", async (req, res, next) => {
    try {
      const customers = await Customer.findById(req.params.id);
      res.send(customers);
      next();
    } catch (err) {
      // TODO: this is currently returning a null, need to dig into this issue
      return next(
        new errors.ResourceNotFoundError(
          `There is no record with the following id: ${req.params.id}`
        )
      );
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
    // Create the customer from Customer model and return created status 201
    try {
      const newCustomer = await customer.save();
      res.send(201);
      next();
    } catch (err) {
      return next(new errors.InternalError(err.message));
    }
  });

  // Update a customer
  server.put("/customers/:id", async (req, res, next) => {
    // Check whether we are passing JSON
    if (!req.is("application/json")) {
      return next(
        new errors.InvalidContentError("Expects an 'application/json' value")
      );
    }
    // Update customer based on id
    try {
      const customer = await Customer.findOneAndUpdate(
        { _id: req.params.id },
        req.body
      );
      res.send(200);
      next();
    } catch (err) {
      // TODO: this is currently returning a null, need to dig into this issue
      return next(
        new errors.ResourceNotFoundError(
          `There is no record with the following id: ${req.params.id}`
        )
      );
    }
  });
};
