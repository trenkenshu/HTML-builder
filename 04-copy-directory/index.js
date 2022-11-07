const path = require('node:path');
const fs = require('fs');

let from = path.join(__dirname, 'files');
let to = path.join(__dirname, 'files-copy');


fs.access(to, (err) => {
  if(err) {
    console.log('Creating dir, copying files');
    copyFile();
  } else {
    console.log('Existing dir, actualising');
    fs.rm(to, {
      recursive: true
    }, (err) => {
      copyFile();
    });
  }
});

async function copyFile() {
  return new Promise( (resolve, reject) => {
            fs.cp(from, to, {
            force     : true,
            recursive : true
          }, err => {
            if(err) console.log(err);
            else {
              console.log('Files are copied.');
              resolve();
            }
          })
        })
}

