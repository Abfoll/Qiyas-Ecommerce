const fs = require('fs');
const path = require('path');

// Read all .graphql files in this directory and combine them
const typeDefs = fs.readFileSync(path.join(__dirname, 'base.graphql'), 'utf8');

module.exports = typeDefs;