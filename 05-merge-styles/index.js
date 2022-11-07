const fs = require('fs/promises');
const path = require('node:path');

let buffer = '';
let promises = [];
let cssPath = path.join(__dirname, 'styles');
let outputFile = path.join(__dirname, 'project-dist', 'bundle.css');

fs.readdir(cssPath, {
  withFileTypes:  true
})
.then( (files) => {

  for(let i = 0; i < files.length; i++) {
    if(files[i].name.split('.')[1] == 'css' && files[i].isFile()) {
      promises.push(fs.readFile(path.join(cssPath, files[i].name)));
    }
  }

  Promise.allSettled(promises)
  .then( (data) => {

    for(let i = 0; i < data.length; i++) {
      buffer += data[i].value;
     }

    fs.rm(outputFile, {
      recursive: true
    })
    .catch( err => console.log('No old bundle.css found. Creating new.'))
    .finally(() => {
      fs.appendFile(outputFile, buffer)
      .then(console.log('Bundled OK'));
    })

  });
});
