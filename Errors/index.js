

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


exports.handleServerErrors = (err, req, res, next) => {
  res.status(500).send({ msg: 'Internal Server Error'});
};

exports.RouteNotFound = ( req, res, next) => {
  res.status(404).send({ msg: 'Route Not found :/, Please check the spelling of the URL and try again. Thank you :D'})
}


exports.send405Errors = (req, res, next) => {
  res.status(405).send({ msg: 'Unfortunately this method is not allowed with this route' })
}