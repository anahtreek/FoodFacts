module.exports = function(csvFile, jsonFile) {
  let sugarSalt = [];
  let country;
  country = ['Netherlands', 'Canada', 'United Kingdom', 'Australia',
   'France', 'Germany', 'Spain', 'South Africa'];
  let sugar = [0, 0, 0, 0, 0, 0, 0, 0];
  let salt = [0, 0, 0, 0, 0, 0, 0, 0];
  let linenumber = 0;
  let countryIndex;
  let sugarIndex;
  let saltIndex;
  let index;
  let ret;
  // To find the index of region
  // function cntrindex(cntr) {
  //   let ind = -1;
  //   if(cntr) {
  //     for(let i = 0; i < country.length; i = i + 1) {
  //       if(cntr.includes(country[i])) {
  //         ind = i;
  //       }
  //     }
  //   }
  //   return ind;
  // }
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
        sugarIndex = title.indexOf('sugars_100g');
        saltIndex = title.indexOf('salt_100g');
        linenumber = 1;
      }
      if(currentLine[countryIndex] && currentLine[countryIndex].includes(',')) {
        let x = currentLine[countryIndex].split(',');
        for(let j = 0; j < x.length; j = j + 1) {
          index = country.indexOf(x[j]);
          if(index !== -1) {
            sugar[index] = sugar[index] + Number(currentLine[sugarIndex]);
            salt[index] = salt[index] + Number(currentLine[saltIndex]);
          }
        }
      }
      else if(currentLine[countryIndex]) {
        index = country.indexOf(currentLine[countryIndex]);
        if(index !== -1) {
          sugar[index] = sugar[index] + Number(currentLine[sugarIndex]);
          salt[index] = salt[index] + Number(currentLine[saltIndex]);
        }
      }
    });
    rl.on('close', function() {
      for(let i = 0; i < country.length; i = i + 1) {
        let obj = {};
        obj.country = country[i];
        obj.sugar = sugar[i];
        obj.salt = salt[i];
        sugarSalt.push(obj);
      }
      fs.writeFileSync(jsonFile, JSON.stringify(sugarSalt));
    });
    if(sugarSalt) {
      ret = 'JSON written succesugarSaltfully';
    }
  }
  return ret;
};
