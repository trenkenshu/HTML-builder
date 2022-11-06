const fs = require('fs/promises');
const path = require('node:path');

let inputTemplate = path.join(__dirname, 'template.html');
let outputIndex = path.join(__dirname, 'project-dist', 'index.html');
let inputStyles = path.join(__dirname, 'styles');
let outputStyles = path.join(__dirname, 'project-dist', 'style.css');
let components = path.join(__dirname, 'components');
let outputDir = path.join(__dirname, 'project-dist');
let assetFrom = path.join(__dirname, 'assets');
let assetTo = path.join(__dirname, 'project-dist', 'assets');
let exist = false;
let buffer = '';
let replaceIndex = [];

fs.rm(outputDir, {
  recursive: true
})
.catch( err => console.log(err.message))
.then( result => {
  exist = true;
  console.log('Copying assets..');
  return  fs.cp(assetFrom, assetTo, {
            recursive : true,
            force     : true
          });
})
.then( () => {

  let prepareTemplate = [];
  console.log('Assets are copied.');
  console.log('Building template...');
  prepareTemplate.push(fs.readFile(inputTemplate));
  prepareTemplate.push(fs.readdir(components, { withFileTypes: true}));

  return Promise.all(prepareTemplate);
}, (err) =>
  console.log(err.message))
.then( (templateData) => {

  let readPromises = [];
  //console.log(templateData);
  buffer += templateData[0];

  for(let i= 0; i < templateData[1].length; i++) {
    if(templateData[1][i].name.split('.')[1] == 'html' && templateData[1][i].isFile()) {

      let snipet = buffer.indexOf('{{' + templateData[1][i].name.split('.')[0] + '}}');

      if(snipet) {
        let pathToFile = path.join(components, templateData[1][i].name);
        replaceIndex.push({
          name  :  templateData[1][i].name.split('.')[0]
        });
        readPromises.push(fs.readFile(pathToFile));
      }
    }
  }

  return Promise.all(readPromises);

}, (err) =>
  console.log(err.message))
.then( (readData) => {

  //console.log(replaceIndex);
  for(let i = 0; i < replaceIndex.length; i++) {
    buffer = buffer.replace('{{' + replaceIndex[i].name + '}}', readData[i]);
  }

  return fs.appendFile(outputIndex, buffer);
}, (err) =>
  console.log(err.message))
.then( () => {
  console.log('Template is built.');
  return  fs.readdir(inputStyles, {
            withFileTypes:  true
          });
}, (err) =>
console.log(err.message))
.then( (stylesDirData) => {

  replaceIndex = [];
  for(let i= 0; i < stylesDirData.length; i++) {
    if(stylesDirData[i].name.split('.')[1] == 'css' && stylesDirData[i].isFile()) {
      let pathToFile = path.join(inputStyles, stylesDirData[i].name);
      replaceIndex.push(fs.readFile(pathToFile));
    }
  }
  console.log('Buildeng styles...');
  return Promise.all(replaceIndex);
}, err =>
console.log(err))
.then( (stylesData) => {

  buffer = '';
  for(let i = 0; i < stylesData.length; i++) {
    buffer += stylesData[i];
  }
  console.log('Styles are built.');
  return fs.appendFile(outputStyles, buffer);

}, (err) =>
console.log(err.message));
