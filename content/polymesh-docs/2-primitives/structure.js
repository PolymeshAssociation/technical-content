const path = require('path');
const here = `${path.parse(__dirname).base}${path.sep}`;
module.exports = [
    `polymesh-docs/${here}identity`,
    `polymesh-docs/${here}multisig`,
    `polymesh-docs/${here}cdd`,
    `polymesh-docs/${here}confidential_identity`,
    `polymesh-docs/${here}authorisations`,
    `polymesh-docs/${here}assets`,
    `polymesh-docs/${here}portfolios_custody`,
    `polymesh-docs/${here}compliance`,
    `polymesh-docs/${here}settlement`,
    `polymesh-docs/${here}corporate_actions`,
];
