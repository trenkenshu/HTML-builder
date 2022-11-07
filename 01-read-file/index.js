const path = require('path');
const fs = require('fs');

/*fs.readFile(path.join(__dirname, 'text.txt'), 'utf8', function(err, content) {
  if (err) throw err;
  console.log(content);
});*/

let readFile = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');

readFile.on('data', (data) => {
  console.log(data);
});
