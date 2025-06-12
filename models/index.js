const fs = require('fs');
const path = require('path');

const models = {};

// Read all files in the current directory and require them
fs.readdirSync(__dirname)
    .filter((file) => file !== 'index.js' && file.endsWith('.js'))
    .forEach((file) => {
        const model = require(path.join(__dirname, file));
        models[model.name] = model;
    });

module.exports = models;