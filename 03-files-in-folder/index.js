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
      let ext = path.extname(secret + '/' + ans[i].name).split('.');
      let fullName = ans[i].name.split('.');
      console.log(ext);
      let fileName = '';
      for(let ii = 0; ii < fullName.length - 1; ii++) {
        if(ii > 0 && ii < fullName.length - 1) fileName+= '.';
        fileName += fullName[ii];
      }
      ext = ext[ext.length - 1];
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





