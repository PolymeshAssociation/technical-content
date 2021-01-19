const getSidebarConfig = () => {
  const sidebarContent = require('./content/structure.js');
  const sidebarDefaults = {
    null: [
      'index',
    ]
  };

  return sidebarCategories = {...sidebarDefaults, ...sidebarContent};
}


module.exports = {
  siteMetadata: {
    title: "Polymath Developer Portal",
  },
  plugins: [
  	{
      resolve: 'gatsby-theme-apollo-docs',
      options: {
        root: __dirname,
        contentDir: 'content',
        subtitle: 'Polymath Developer Portal subtitle',
        description: 'Polymath Developer Portal description',
        githubRepo: 'PolymathNetwork/technical-content',
        siteName: 'Polymath Developer Portal',
        sidebarCategories: getSidebarConfig()
      }
    }
  ]
};
