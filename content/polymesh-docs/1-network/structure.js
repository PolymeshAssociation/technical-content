const path = require('path');
const here = `${path.parse(__dirname).base}${path.sep}`;
module.exports = [
    `polymesh-docs/${here}architecture`,
    `polymesh-docs/${here}polyx`,
    `polymesh-docs/${here}bridge`,
    `polymesh-docs/${here}fees`,
    `polymesh-docs/${here}permissioned_roles`,
    `polymesh-docs/${here}governance`,
    `polymesh-docs/${here}tokenomics`,
    `polymesh-docs/${here}consensus`,
    `polymesh-docs/${here}ledger`,
    `polymesh-docs/${here}running_a_node_docker`,
];
