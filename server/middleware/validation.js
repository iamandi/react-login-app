module.exports = (schema) => (req, res, next) => {
  console.log("req.body", req.body);
  const result = schema.validate(req.body);

  console.log("result", result);

  if (result.error)
    return res.status(400).send({ error: result.error.details[0].message });

  next();
};
