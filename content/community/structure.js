const path = require('path');
const here = `${path.parse(__dirname).base}${path.sep}`;
module.exports = [
    `${here}overview`,
    `${here}code-of-conduct`,
    `${here}bug-bounty`,
    `${here}bug-bounty-rules`
];
