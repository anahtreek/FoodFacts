let fs = require('fs');
let readline = require('readline');
let Stream = require('stream');
let instream = fs.createReadStream('../inputdata/FoodFacts.csv');
let outstream = new Stream();
let rl = readline.createInterface(instream, outstream);
let ss = [];
let c;
c = ['Netherlands', 'Canada', 'UK/USA', 'Australia', 'France', 'Germany', 'Spain', 'South Africa'];
let sugar = [0, 0, 0, 0, 0, 0, 0, 0];
let salt = [0, 0, 0, 0, 0, 0, 0, 0];
function cntrindex(cntr) {
  let ind = -1;
  if(cntr) {
    for(let i = 0; i < c.length; i = i + 1) {
      if(cntr.includes(c[i])) {
        ind = i;
      }
    }
  }
  return ind;
}
rl.on('line', function(line) {
  let currentLine = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
  let index = cntrindex(currentLine[33]);
  if(index !== -1) {
    sugar[index] = sugar[index] + Number(currentLine[102]);
    salt[index] = salt[index] + Number(currentLine[116]);
  }
});
rl.on('close', function() {
  for(let i = 0; i < c.length; i = i + 1) {
    let obj = {};
    obj.country = c[i];
    obj.sugar = sugar[i];
    obj.salt = salt[i];
    ss.push(obj);
  }
  fs.writeFileSync('../outputdata/sugarsalt.json', JSON.stringify(ss));
});
