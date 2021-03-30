import PropTypes from 'prop-types';
import React from 'react';
import SEO from '../../gatsby-theme-apollo-core/components/seo.js';
import {withPrefix} from 'gatsby';

export default function CustomSEO({image, baseUrl, twitterHandle, ...props}) {
  const imagePath = withPrefix('/' + image);
  return (
    <SEO {...props} twitterCard="summary_large_image">
      <meta property="og:image" content="/social-card.png" />
      {baseUrl && <meta name="twitter:image" content="/social-card.png" />}
      {twitterHandle && (
        <meta name="twitter:site" content={`@${twitterHandle}`} />
      )}
    </SEO>
  );
}

CustomSEO.propTypes = {
  baseUrl: PropTypes.string,
  image: PropTypes.string.isRequired,
  twitterHandle: PropTypes.string
};
