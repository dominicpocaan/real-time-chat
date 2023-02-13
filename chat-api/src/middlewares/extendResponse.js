const responseBuilder = (res, { status, message }) => {
  return (data) => {
    const body = { status, message };

    if (data != undefined) body.data = data;

    res.status(status).send(body);
  };
};

const extendedResponse = (req, res, next) => {
  res.success = responseBuilder(res, {
    status: 200,
    message: 'Successfully Processed',
  });
  res.created = responseBuilder(res, {
    status: 201,
    message: 'Created Successfully',
  });
  res.deleted = responseBuilder(res, {
    status: 202,
    message: 'Deleted Successfully',
  });
  res.updated = responseBuilder(res, {
    status: 203,
    message: 'Updated Successfully',
  });
  res.patched = responseBuilder(res, {
    status: 204,
    message: 'Patched Successfully',
  });

  next();
};

module.exports = extendedResponse;
