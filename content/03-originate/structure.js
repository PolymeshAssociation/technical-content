const path = require('path');
const here = `${path.parse(__dirname).base}${path.sep}`;
module.exports = [
    `${here}landingpage`,
    `${here}originate-introduction`,
    `${here}originate-dashboard`,
    `${here}originate-secondary`,    
    `${here}originate-sdk`,
    `${here}originate-quiz`
];
