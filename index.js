const fs = require('fs');

const data = fs.readFileSync(
    './countries.txt',
    { encoding: 'utf8', flag: 'r' });

var countries = data.split(/\r?\n/)
countries.shift() 

var countries_data = countries.map(c => c.split(" "))
// console.log(countries_data);

var regex = /[a-zA-Z]/;

var countries_density_population = countries_data.map(e => {
    
    var name = '';
    var numbers = [];
    var density = 0;

    for (var i = 0; i < e.length; i++) {
        if (regex.test(e[i])){
            name = name.concat(e[i] + " ")
        }
        else if (!regex.test(e[i])){
            numbers.push(parseFloat(e[i].replace(/,/g, "")))
            density = Number((numbers[0] / numbers[1]))
        }
    }
    return{
        country: name,
        population: numbers[0],
        area: numbers[1],
        density: density
    }
})

console.log(countries_density_population)