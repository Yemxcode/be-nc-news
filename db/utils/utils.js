exports.formatDates = list => {
 return list.map(obj => {
   const newObj = {...obj};
   newObj.created_at = new Date(newObj.created_at);
   return newObj;
 })
};

exports.makeRefObj = list => {
  const newObj = {};
  list.forEach(obj => newObj[obj.title] = obj.article_id)
  return newObj;
};

exports.formatComments = (comments, articleRef) => {
  return comments.map(obj => {
   const newObj = {...obj};
   newObj.article_id = articleRef[newObj.belongs_to];
   delete newObj.belongs_to;
   newObj.author = newObj.created_by;
   delete newObj.created_by;
   newObj.created_at = new Date(newObj.created_at);
   return newObj;
  })
};
