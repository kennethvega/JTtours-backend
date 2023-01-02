import { ErrorRequestHandler } from "express"; // TS type

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500; // --> provided status code or default 500
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? err.stack : null, // --> show stack only in development
  });
};

export default errorHandler;