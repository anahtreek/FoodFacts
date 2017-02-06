module.exports = function(csvFile, jsonFile) {
  let carboProtienFat = [];
  let region = ['North Europe', 'Central Europe', 'South Europe'];
  let NE = ['United Kingdom', 'Denmark', 'Sweden', 'Norway'];
  let CE = ['France', 'Belgium', 'Germany', 'Switzerland', 'Netherlands'];
  let SE = ['Portugal', 'Greece', 'Italy', 'Spain', 'Croatia', 'Albania'];
  let carbo = [0, 0, 0];
  let protein = [0, 0, 0];
  let fat = [0, 0, 0];
  let linenumber = 0;
  let countryIndex;
  let carboIndex;
  let proteinIndex;
  let fatIndex;
  let index;
  let ret;
  // To find the index of region
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
  // Check if the CSV and JSON file paths are given in parameters
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
    // While reading every line
    rl.on('line', function(line) {
      let currentLine = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
      if(linenumber === 0) {
        let title = currentLine;
        countryIndex = title.indexOf('countries_en');
        carboIndex = title.indexOf('carbohydrates_100g');
        proteinIndex = title.indexOf('proteins_100g');
        fatIndex = title.indexOf('fat_100g');
        linenumber = 1;
      }
      if(currentLine[countryIndex] && currentLine[countryIndex].includes(',')) {
        let x = currentLine[countryIndex].split(',');
        for(let j = 0; j < x.length; j = j + 1) {
          index = regionindex(x[j]);
          if(index !== -1) {
            carbo[index] = carbo[index] + Number(currentLine[carboIndex]);
            protein[index] = protein[index] + Number(currentLine[proteinIndex]);
            fat[index] = fat[index] + Number(currentLine[fatIndex]);
          }
        }
      }
      else if(currentLine[countryIndex]) {
        index = regionindex(currentLine[countryIndex]);
        if(index !== -1) {
          carbo[index] = carbo[index] + Number(currentLine[carboIndex]);
          protein[index] = protein[index] + Number(currentLine[proteinIndex]);
          fat[index] = fat[index] + Number(currentLine[fatIndex]);
        }
      }
    });
    // Once the whole file is read line by line
    rl.on('close', function() {
      for(let i = 0; i < region.length; i = i + 1) {
        let obj = {};
        obj.region = region[i];
        obj.carbohydrates = carbo[i];
        obj.protein = protein[i];
        obj.fat = fat[i];
        carboProtienFat.push(obj);
      }
      fs.writeFileSync(jsonFile, JSON.stringify(carboProtienFat));
    });
    if(carboProtienFat) {
      ret = 'JSON written successfully';
    }
  }
  return ret;
};
