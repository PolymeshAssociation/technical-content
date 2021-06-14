const path = require('path');
const here = `${path.parse(__dirname).base}${path.sep}`;
module.exports = [
    `${here}landingpage`,
    `${here}quickstart-wallet`,
    `${here}quickstart-cdd`,
    `${here}quickstart-polyx`,
    `${here}quickstart-quiz`
];
