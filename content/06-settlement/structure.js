const path = require('path');
const here = `${path.parse(__dirname).base}${path.sep}`;
module.exports = [
    `${here}settlement-introduction`,
    `${here}settlement-dashboard`,
    `${here}settlement-sdk`,
    `${here}settlement-quiz`
];
