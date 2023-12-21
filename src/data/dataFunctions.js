const fs = require ('fs');
const path = require ('path');

const leerArchivo = (nameFile) => {
    let pathFile = path.join(__dirname,"../data",nameFile+".json");
    let products = JSON.parse(fs.readFileSync(pathFile,'utf-8'));
    return products;
}

const escribirArchivo = (newArray, nameFile) => {
    let pathFile = path.join(__dirname,"../data",nameFile+".json");
    let arrayJson = JSON.stringify(newArray);
    fs.writeFileSync(pathFile,arrayJson,'utf-8')
}

module.exports = {leerArchivo,escribirArchivo}