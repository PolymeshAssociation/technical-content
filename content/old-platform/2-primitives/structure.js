const path = require('path');
const here = `${path.parse(__dirname).base}${path.sep}`;
module.exports = [
    `old-platform/${here}identity`,
    `old-platform/${here}cdd`,
    `old-platform/${here}confidential_identity`,
    `old-platform/${here}authorisations`,
    `old-platform/${here}assets`,
    `old-platform/${here}portfolio_custody`,
    `old-platform/${here}compliance`,
    `old-platform/${here}settlement`,
    `old-platform/${here}corporate_actions`,
    `old-platform/${here}smart_extensions`
];
