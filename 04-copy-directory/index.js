const fsProm = require('fs/promises');
const path = require('node:path');
const fs = require('fs');

let from = path.join(__dirname, 'files');
let to = path.join(__dirname, 'files-copy');
let options = {
  recursive : true,
  force     : true
};

fs.access(to, (err) => {
  //console.log('access cb:', err);
  if(err) {
    console.log('Creating dir, copying files');
    copyFiles();
  } else {
    console.log('Existing dir, actualising');
    fs.rm(to, {
      recursive: true
    }, (err) => {
      copyFiles();
    });
  }
});

function copyFiles() {
  fsProm.mkdir(to, {
    recursive: true
  })
  .catch(err => console.log(err.message))
  .then(() => {
    fs.cp(from, to, {
      recursive : true,
      force     : true
    }, (res) => {
      console.log('Files copied!');
    });
  });
}

