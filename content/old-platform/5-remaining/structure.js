const path = require('path');
const here = `${path.parse(__dirname).base}${path.sep}`;
module.exports = [
    `old-platform/${here}index`,
    `old-platform/${here}architecture`,
    `old-platform/${here}testnet`,
    `old-platform/${here}ledger`,
    `old-platform/${here}confidential_assets`,
    `old-platform/${here}grants`,
    `old-platform/${here}smart_contracts`,
    `old-platform/${here}statistics`
];
