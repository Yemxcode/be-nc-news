
const {getEndPoints} = require('../models/api');


exports.sendEndPoints = (req, res, next) => {
  getEndPoints()
  .then(endPoints => 
   res.status(200).send({endPoints}))
  .catch(next)
}

