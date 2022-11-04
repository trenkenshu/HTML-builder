const path = require('node:path');
const fs = require('fs');

fs.readFile(path.join(__dirname, 'text.txt'), 'utf8', function(err, content) {
  if (err) throw err;
  console.log(content);
});