const fsProm = require('fs/promises');
const path = require('node:path');
const fs = require('fs');
const { resolve } = require('path');


let secret = path.join(__dirname, 'secret-folder');
let files = fsProm.readdir(secret, { withFileTypes: true});
let stats = [];
let filesData = [];
let q = 0;

files.then((ans) => {

  for(let i = 0; i < ans.length; i++) {
    if(ans[i].isFile()) {
      stats.push(fsProm.stat(path.join(secret, ans[i].name)));
      filesData.push({
          'file name'   : ans[i].name.split('.')[0],
          'extension'   : path.extname(secret + '/' + ans[i].name).split('.')[1],
        });
    }
  }

  Promise.allSettled(stats).then((results) => {
    for( let i = 0; i < results.length; i++) {
      filesData[i]['size, bytes'] = results[i].value.size;
    }
    console.table(filesData);
  });

});





