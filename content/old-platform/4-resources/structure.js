const path = require('path');
const here = `${path.parse(__dirname).base}${path.sep}`;
module.exports = [
    `old-platform/${here}glossary`,
    `old-platform/${here}resources`
];
