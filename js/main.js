let convertSS = require('../js/s+s');
let convertCPF = require('../js/cpf');
convertSS('../inputdata/FoodFacts.csv', '../outputdata/sugarsalt.json');
convertCPF('../inputdata/FoodFacts.csv', '../outputdata/cpf.json');
