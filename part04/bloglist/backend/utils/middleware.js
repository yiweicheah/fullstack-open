const morgan = require("morgan");

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

const requestLogger = () => {
  return morgan(
    ":method :url :status :res[content-length] - :response-time ms :body"
  );
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (err, req, res, next) => {
  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }

  next(err);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};