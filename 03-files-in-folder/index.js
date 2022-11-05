const fsProm = require('fs/promises');
const path = require('node:path');
const fs = require('fs');


let secret = path.join(__dirname, 'secret-folder');
let files = fsProm.readdir(secret, { withFileTypes: true});
let answer = [];

console.log(`\n______________________________________________________________________________________\n
${secret}\n______________________________________________________________________________________\n`);
files.then((ans) => {
  for(let i = 0; i < ans.length; i++) {
    if(ans[i].isFile()) {
      fs.stat(path.join(secret, ans[i].name), (err, stat) => {
          if(err) throw err;
          console.log(ans[i].name.split('.')[0], '— ' + path.extname(secret + '/' + ans[i].name).split('.')[1], '— ' + stat.size+' bytes');
      });
    }
  }
  return;
});



