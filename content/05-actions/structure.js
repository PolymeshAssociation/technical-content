const path = require('path');
const here = `${path.parse(__dirname).base}${path.sep}`;
module.exports = [
    `${here}landingpage`,
    `${here}actions-introduction`,
    `${here}actions-dashboard`,
    `${here}actions-sdk`,
    `${here}token-manager`,
    `${here}actions-quiz`
];
