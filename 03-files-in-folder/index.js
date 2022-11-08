const fsProm = require('fs/promises');
const path = require('path');
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
      let ext = path.extname(path.join(secret, ans[i].name)).split('.');
      ext = ext[ext.length - 1];
      let fileName = ans[i].name.slice(0, ans[i].name.length - ext.length - 1);

      filesData.push({
          'file name'   : fileName,
          'extension'   : ext,
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





