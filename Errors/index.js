

const createErrMessage = (err) => {
 return err.message.split(' - ')[1];
}

exports.handleCustomErrors = (err, req, res, next) => {
  res.status(404).send(err.msg);
}

exports.psqlErrorHandler = (err, req, res, next) => {
 const psqlErrors = {
  "42703" : {
   status : 400,
   msg: createErrMessage(err)
  }
 };
 const triggeredError = psqlErrors[err.code];
 if (triggeredError) {
  res.status(triggeredError.status).send({ msg: triggeredError.msg });
 } else {
  next(err);
 }
}