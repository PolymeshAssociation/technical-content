const path = require('path');
const here = `${path.parse(__dirname).base}${path.sep}`;
module.exports = [
    `${here}kyc-introduction`,
    `${here}kyc-dashboard`,
    `${here}kyc-sdk`,
    `${here}kyc-quiz`
];
