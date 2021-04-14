const path = require('path');
const here = `${path.parse(__dirname).base}${path.sep}`;
module.exports = [
    `${here}landingpage`,
    `${here}kyc-introduction`,
    `${here}kyc-dashboard`,
    `${here}kyc-sdk`,
    `${here}kyc-app`,
    `${here}cdd-sdk`,
    `${here}kyc-quiz`
];
