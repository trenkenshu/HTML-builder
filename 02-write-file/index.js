const fs = require('fs');
const path = require('node:path');
const readline = require('readline');
const process = require('process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Напиши что-то хорошее:');

rl.on('line', answer => {
  if( /^exit/.test(answer) ) {
    console.log('Ну, всё. Хорошего по-немногу :)');
    process.exit();
  } else {
    fs.appendFile(path.join(__dirname, 'text.txt'), answer+' \r\n', function(err) {
      if(err) return console.log(err);
      console.log("Молодец! Теперь напиши что-то еще лучше:");
    });
  }
});

rl.on('SIGINT', () => {
  console.log('Ну, всё. Хорошего по-немногу :)');
  process.exit();
});



