// Converting from csv to json
let convertSugarSalt = require('../js/sugarSalt');
let convertCarboProteinFat = require('../js/carboProteinFat');
convertSugarSalt('../inputdata/FoodFacts.csv', '../outputdata/sugarSalt.json');
convertCarboProteinFat('../inputdata/FoodFacts.csv', '../outputdata/carboProteinFat.json');
