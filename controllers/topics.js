
const {fetchTopics, insertTopic} = require('../models/topics')




exports.getTopics = (req, res, next) => {
  fetchTopics()
  .then(topics => res.status(200).send({topics}))
  .catch(next);
}

exports.postTopic = (req, res, next) => {
  const {description, slug} = req.body;
  insertTopic(description, slug)
    .then(topic => res.status(200).send({ topic }))
      .catch(next);
}