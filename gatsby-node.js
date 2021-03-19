const jsYaml = require('js-yaml');
const path = require('path');
const git = require('simple-git')();
const {createFilePath} = require('gatsby-source-filesystem');
const {getVersionBasePath, getSpectrumUrl} = require('./src/gatsby-theme-apollo-docs/utils');
const {createPrinterNode} = require('gatsby-plugin-printer');

const mainGatsbyConfig = require('./gatsby-config');

function getConfigPaths(baseDir) {
  return [
    path.join(baseDir, 'gatsby-config.js'), // new gatsby config
    path.join(baseDir, '_config.yml') // old hexo config
  ];
}

async function onCreateNode(
  {node, actions, getNode, loadNodeContent},
  {
    baseDir = '',
    contentDir = 'content',
    defaultVersion = 'default',
    localVersion,
    siteName,
    subtitle,
    sidebarCategories
  }
) {

  const configPaths = getConfigPaths(baseDir);
  if (configPaths.includes(node.relativePath)) {
    const value = await loadNodeContent(node);
    actions.createNodeField({
      name: 'raw',
      node,
      value
    });
  }

  if (['MarkdownRemark', 'Mdx'].includes(node.internal.type)) {
    const parent = getNode(node.parent);
    let version = localVersion || defaultVersion;
    let slug = createFilePath({
      node,
      getNode
    });
    let page_subsite;

    if (node.frontmatter.slug) {
      slug = node.frontmatter.slug; // eslint-disable-line prefer-destructuring
    }

    if (node.frontmatter.subsite) {
      page_subsite = node.frontmatter.subsite; // eslint-disable-line prefer-destructuring
    }

    let category;
    const fileName = parent.name;
    const outputDir = 'social-cards';

    for (const key in sidebarCategories) {
      if (key !== 'null') {
        const categories = sidebarCategories[key];
        const trimmedSlug = slug.replace(/^\/|\/$/g, '');
        if (categories.includes(trimmedSlug)) {
          category = key;
          break;
        }
      }
    }

    const {title, sidebar_title, api_reference} = node.frontmatter;
    
    if (page_subsite) {
      actions.createNodeField({
        node,
        name: 'page_subsite',
        value: page_subsite
      });
    }

  }
}

exports.onCreateNode = onCreateNode;

function getPageFromEdge({node}) {
  return node.childMarkdownRemark || node.childMdx;
}


function getSidebarContents(edges, version, dirPattern, subCategory=null) {
  const sidebarCategories = mainGatsbyConfig.plugins[0].options.sidebarCategories;
  const subSites = mainGatsbyConfig.plugins[0].options.subSites;

  let filterActive = false;
  let activeSubSite;

  if (typeof subCategory !== "undefined" && subCategory) {
    filterActive = true;
    activeSubSite = subSites.filter((site) => { return site.id == subCategory })
    activeSubSite = activeSubSite ? activeSubSite[0] : null
  }

  let mainSidebarCategories = sidebarCategories 
    ? sidebarCategories
    : {};

  if (filterActive) {
    if (activeSubSite) {
      mainSidebarCategories = activeSubSite.sidebarCategories
    } else {
      mainSidebarCategories = {};
      console.log(`WARN: couldn't find sidebar structure for category ${subCategory}`)
    }
  }

  return Object.keys(mainSidebarCategories).map(key => ({
    title: key === 'null' ? null : key,
    pages: mainSidebarCategories[key]
      .map(linkPath => {
        const match = linkPath.match(/^\[(.+)\]\((https?:\/\/.+)\)$/);
        if (match) {
          return {
            anchor: true,
            title:" match[1]",
            path: match[2]
          };
        }

        const edge = edges.find(edge => {
          const {relativePath} = edge.node;
          const {fields} = getPageFromEdge(edge);
          return (
            fields.version === version &&
            relativePath
              .slice(0, relativePath.lastIndexOf('.'))
              .replace(dirPattern, '') === linkPath
          );
        });

        if (!edge) {
          return null;
        }

        const {frontmatter, fields} = getPageFromEdge(edge);
        return {
          title: frontmatter.title,
          sidebarTitle: fields.sidebarTitle,
          description: frontmatter.description,
          path: fields.slug,
          showDevSign: frontmatter.showDevSign
        };
      })
      .filter(Boolean)
  }));
}

function getVersionSidebarCategories(gatsbyConfig, hexoConfig) {
  if (gatsbyConfig) {
    const trimmed = gatsbyConfig.slice(
      gatsbyConfig.indexOf('sidebarCategories')
    );

    const json = trimmed
      .slice(0, trimmed.indexOf('}'))
      // wrap object keys in double quotes
      .replace(/['"]?(\w[\w\s&-]+)['"]?:/g, '"$1":')
      // replace single-quoted array values with double quoted ones
      .replace(/'([\w-/.]+)'/g, '"$1"')
      // remove trailing commas
      .trim()
      .replace(/,\s*\]/g, ']')
      .replace(/,\s*$/, '');

    const {sidebarCategories} = JSON.parse(`{${json}}}`);
    return sidebarCategories;
  }

  const {sidebar_categories} = jsYaml.load(hexoConfig);
  return sidebar_categories;
}

const pageFragment1 = `
  internal {
    type
  }
  fields {
    slug
    version
    versionRef
    sidebarTitle
  }
`;

const pageFragment2 = `
  frontmatter {
    title
    description
  }
`;


exports.createPages = async (
  {actions, graphql},
  {
    baseDir = '',
    contentDir = 'content',
    defaultVersion = 'default',
    versions = {},
    subtitle,
    githubRepo,
    githubHost = 'github.com',
    sidebarCategories,
    spectrumHandle,
    spectrumPath,
    ffWidgetId,
    twitterHandle,
    localVersion,
    baseUrl
  }
) => {
  const {data} = await graphql(`
    {
      allFile(filter: {extension: {in: ["md", "mdx"]}}) {
        edges {
          node {
            id
            relativePath
            childMarkdownRemark {
              ${pageFragment1}
              ${pageFragment2}
            }
            childMdx {
              ${pageFragment1}
              frontmatter {
                title
                description
                subsite
              }
            }
          }
        }
      }
    }
  `);

  const {edges} = data.allFile;
  const mainVersion = localVersion || defaultVersion;
  const contentPath = path.join(baseDir, contentDir);
  const dirPattern = new RegExp(`^${contentPath}/`);

  const sidebarContents = {
    [mainVersion]: getSidebarContents(
      edges,
      mainVersion,
      dirPattern
    )
  };

  const configPaths = getConfigPaths(baseDir);
  const versionKeys = [localVersion].filter(Boolean);

  let defaultVersionNumber = null;
  try {
    defaultVersionNumber = parseFloat(defaultVersion, 10);
  } catch (error) {
    // let it slide
  }

  // get the current git branch
  // try to use the BRANCH env var from Netlify
  // fall back to using git rev-parse if BRANCH is not available
  const currentBranch =
    process.env.BRANCH || (await git.revparse(['--abbrev-ref', 'HEAD']));
  

  const template = require.resolve('./node_modules/gatsby-theme-apollo-docs/src/components/template');
  edges.forEach(edge => {
    const {id, relativePath} = edge.node;
    const {fields, frontmatter} = getPageFromEdge(edge);
    
    let versionDifference = 0;
    if (defaultVersionNumber) {
      try {
        const versionNumber = parseFloat(fields.version, 10);
        versionDifference = versionNumber - defaultVersionNumber;
      } catch (error) {
        // do nothing
      }
    }

    let githubUrl;
    let repoPath;

    if (githubRepo) {
      const [owner, repo] = githubRepo.split('/');
      githubUrl =
        'https://' +
        path.join(
          githubHost,
          owner,
          repo,
          'tree',
          fields.versionRef || path.join(currentBranch, contentPath),
          relativePath
        );

      repoPath = `/${repo}`;
    }

    actions.createPage({
      path: fields.slug,
      component: template,
      context: {
        id,
        subtitle,
        versionDifference,
        versionBasePath: getVersionBasePath(fields.version),
        sidebarContents: getSidebarContents(edges, mainVersion, dirPattern, frontmatter.subsite),
        githubUrl,
        ffWidgetId,
        spectrumUrl:
          spectrumHandle &&
          getSpectrumUrl(spectrumHandle) + (spectrumPath || repoPath),
        twitterHandle,
        versions: versionKeys, // only need to send version labels to client
        defaultVersion,
        baseUrl
      }
    });
  });
};
