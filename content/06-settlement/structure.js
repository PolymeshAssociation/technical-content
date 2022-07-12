const path = require('path');
const here = `${path.parse(__dirname).base}${path.sep}`;
module.exports = [
    `${here}landingpage`,
    `${here}settlement-introduction`,
    `${here}settlement-dashboard`,
    `${here}settlement-external-agents`,
    `${here}settlement-sdk`,
    `${here}settlement-app`,
    `${here}settlement-quiz`
];
