const accessLog = (req, res, next) => {
  const ipAddress = req.headers['x-forwarded-for'] ?? '0.0.0.0';

  console.log(
    `[access] => ip address: ${ipAddress} | original url: ${
      req.originalUrl
    } | method: ${req.method} | params: ${JSON.stringify(
      req.params
    )} | query: ${JSON.stringify(req.query)} | body: ${JSON.stringify(
      req.body
    )}\n`
  );

  next();
};

module.exports = accessLog;
