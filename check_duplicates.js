const readline = require('readline');
const fs = require('fs');

if (process.argv.length < 3) {
    console.error("No input file specified as argument");
    return;
}
const inputFile = process.argv[2];
console.log(`Input File : ${inputFile}`)

const rl = readline.createInterface({ input: fs.createReadStream(inputFile)});

let values = {};
let counter = 0;

console.log("***Started Duplication Analysis***");

rl.on('line', function (line) { 
    counter++;
    let value = line.trim();
    values[value] = (values[value] || 0) + 1;
    
    if (counter % 100000 == 0){
        console.clear();
        console.log(`${counter} lines processed so far.`);
    }
});

rl.on('close', function () { 
    console.log("***Finished Duplication Analysis");

    for(var key in values){
        if (values[key] > 1){
            console.log(`'${key}' duplicated ${values[key]} times.`);
        }
    }
});

