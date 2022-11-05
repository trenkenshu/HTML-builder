const fs = require('fs');
const path = require('node:path');

let buffer = '';
let cssPath = path.join(__dirname, 'styles');
let outputPath = path.join(__dirname, 'project-dist');
let outputFile = path.join(__dirname, 'project-dist', 'bundle.css');

fs.readdir(cssPath, {
  withFileTypes:  true
}, (err, files) => {
  for(let i = 0; i < files.length; i++) {
    if(files[i].name.split('.')[1] == 'css' && files[i].isFile()) {
      buffer += fs.readFileSync(path.join(cssPath, files[i].name));
    }
  }

  fs.rm(outputFile, {
    recursive: true
  }, (err) => {
    if(err) console.log('Creating bundle.css');
    else console.log('Updating bundle.css');

    fs.appendFile(outputFile, buffer, (err) => {
      if(err) console.log(err.message);
      console.log('Bundled OK');
    })
  });
});