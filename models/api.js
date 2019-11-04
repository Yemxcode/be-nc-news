const fs = require('fs');




exports.getEndPoints = () => {
  return new Promise((resolve, reject) => {
   fs.readFile('./endpoints.json', 'utf8', (err, data) => {
    if (err) reject(err);
    else resolve(data);
   });
  });
};





