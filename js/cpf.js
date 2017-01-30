module.exports = function(csvFile, jsonFile) {
  let cpf = [];
  let region = ['North Europe', 'Central Europe', 'South Europe'];
  let NE = ['United Kingdom', 'Denmark', 'Sweden', 'Norway'];
  let CE = ['France', 'Belgium', 'Germany', 'Switzerland', 'Netherlands'];
  let SE = ['Portugal', 'Greece', 'Italy', 'Spain', 'Croatia', 'Albania'];
  let carbo = [0, 0, 0];
  let protien = [0, 0, 0];
  let fat = [0, 0, 0];
  let linenumber = 0;
  let countryIndex;
  let carboIndex;
  let protienIndex;
  let fatIndex;
  let index;
  let ret;
  function regionindex(cntr) {
    let ind = -1;
    if(cntr && NE.includes(cntr)) {
      ind = 0;
    }
    else if(cntr && CE.includes(cntr)) {
      ind = 1;
    }
    else if(cntr && SE.includes(cntr)) {
      ind = 2;
    }
    return ind;
  }
  if(!csvFile || !jsonFile) {
    ret = 'Enter parameters';
  }
  else {
    const fs = require('fs');
    const readline = require('readline');
    const Stream = require('stream');
    let instream = fs.createReadStream(csvFile);
    let outstream = new Stream();
    let rl = readline.createInterface(instream, outstream);
    rl.on('line', function(line) {
      let currentLine = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
      if(linenumber === 0) {
        let title = currentLine;
        countryIndex = title.indexOf('countries_en');
        carboIndex = title.indexOf('carbohydrates_100g');
        protienIndex = title.indexOf('proteins_100g');
        fatIndex = title.indexOf('fat_100g');
        linenumber = 1;
      }
      if(currentLine[countryIndex] && currentLine[countryIndex].includes(',')) {
        let x = currentLine[countryIndex].split(',');
        for(let j = 0; j < x.length; j = j + 1) {
          index = regionindex(x[j]);
          if(index !== -1) {
            carbo[index] = carbo[index] + Number(currentLine[carboIndex]);
            protien[index] = protien[index] + Number(currentLine[protienIndex]);
            fat[index] = fat[index] + Number(currentLine[fatIndex]);
          }
        }
      }
      else if(currentLine[countryIndex]) {
        index = regionindex(currentLine[countryIndex]);
        if(index !== -1) {
          carbo[index] = carbo[index] + Number(currentLine[carboIndex]);
          protien[index] = protien[index] + Number(currentLine[protienIndex]);
          fat[index] = fat[index] + Number(currentLine[fatIndex]);
        }
      }
    });
    rl.on('close', function() {
      for(let i = 0; i < region.length; i = i + 1) {
        let obj = {};
        obj.region = region[i];
        obj.carbohydrates = carbo[i];
        obj.protien = protien[i];
        obj.fat = fat[i];
        cpf.push(obj);
      }
      fs.writeFileSync(jsonFile, JSON.stringify(cpf));
    });
    if(cpf) {
      ret = 'JSON written successfully';
    }
  }
  return ret;
};
