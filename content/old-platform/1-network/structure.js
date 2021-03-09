const path = require('path');
const here = `${path.parse(__dirname).base}${path.sep}`;
module.exports = [
    `old-platform/${here}polyx`,
    `old-platform/${here}bridge`,
    `old-platform/${here}fees`,
    `old-platform/${here}permissioned_roles`,
    `old-platform/${here}governance`,
    `old-platform/${here}tokenomics`,
    `old-platform/${here}consensus`
];
