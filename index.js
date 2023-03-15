const fs = require('fs');

const data = fs.readFileSync(
    './countries.txt',
    { encoding: 'utf8', flag: 'r' });

var countries = data.split(/\r?\n/) // ---> ['Country Population Area', 'Afghanistan 38,928,346 652,860', ....
countries.shift() // --> ['Afghanistan 38,928,346 652,860', ....

var countries_data = countries.map(c => c.split(" ")) // --> [ ['Afghanistan', '38,928,346', '652,860'], [], ....

var regex = /[a-zA-Z]/;

var countries_density_population = countries_data.map(e => {

    var name = '';
    var numbers = [];
    var density = 0;

    for (var i = 0; i < e.length; i++) {
        if (regex.test(e[i])) {
            name = name.concat(e[i] + " ")
        }
        else if (!regex.test(e[i])) {
            numbers.push(parseFloat(e[i].replace(/,/g, "")))
            density = Number((numbers[0] / numbers[1]))
        }
    }

    return {
        country: name,
        population: numbers[0],
        area: numbers[1],
        density: density
    }
})


var countries_sorted = countries_density_population.sort((a, b) => b.density - a.density)

var new_file = "COUNTRY POPULATION AREA DENSITY" + countries_sorted.map(e => {
    return (
        "\r\n"
            .concat(e.country, " ").concat(e.population, " ").concat(e.area, " ").concat(e.density)
    )
})

fs.writeFileSync("countries.csv", new_file);
// fs.writeFileSync("programming.txt", data);