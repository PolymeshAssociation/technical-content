/* global preval */
import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import TextFit from 'react-textfit';
import {Global, css} from '@emotion/core';
import {IconArrowRight} from '@apollo/space-kit/icons/IconArrowRight';
import {colors} from 'gatsby-theme-apollo-core/src/utils/colors';
import {smallCaps} from 'gatsby-theme-apollo-core/src/utils/typography';

const {fonts, image, logo} = preval`
  const fs = require('fs');
  const path = require('path');

  function getBase64(path) {
    const fontPath = require.resolve('@fontsource/inter/files' + path);
    const base64Font = fs.readFileSync(fontPath, 'base64');
    return 'data:application/x-font-woff;charset=utf-8;base64,' + base64Font;
  }

  const base64Regular = getBase64('/inter-all-400-normal.woff');

  const cssPath = require.resolve('@fontsource/inter/index.css');
  const fonts = fs
    .readFileSync(cssPath, 'utf-8')
    .replace(/\\.\\/files\\/inter-all-400-normal\\.woff/g, base64Regular);

  const imagePath = path.resolve(__dirname, '../assets/social-bg.jpg');
  const base64Image = fs.readFileSync(imagePath, 'base64');

  const logoPath = path.resolve(__dirname, '../assets/polymesh-icon.png');
  const base64Logo = fs.readFileSync(logoPath, 'base64');

  module.exports = {
    fonts,
    image: 'data:image/jpeg;base64,' + base64Image,
    logo: 'data:image/png;base64,' + base64Logo
  };
`;

export default function SocialCard(props) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        boxSizing: 'border-box',
        width: 1200,
        height: 628,
        padding: 80,
        fontFamily: "'Inter'",
        color: 'white',
        backgroundImage: `url(${image})`
      }}
    >
      <Global
        styles={css`
          ${fonts}
          svg.arrow-icon path {
            vector-effect: none;
            stroke-width: 4px;
          }
        `}
      />
      <div
        style={{
          fontSize: 32,
          fontWeight: 600,
          marginBottom: 16,
          color: colors.primaryLight,
          ...smallCaps
        }}
      >
        {props.subtitle}
        {props.category && (
          <Fragment>
            {' '}
            <IconArrowRight
              className="arrow-icon"
              style={{
                width: '0.5em',
                height: '0.5em',
                verticalAlign: '0.05em'
              }}
            />{' '}
            {props.category}
          </Fragment>
        )}
      </div>
      <img src={logo} style={{marginBottom: '50px'}}/>
      <TextFit
        min={80}
        max={120}
        style={{
          width: '100%',
          height: 250,
          marginTop: '50px',
          marginBottom: 'auto',
          lineHeight: 1.2,
          colors: colors.text1
        }}
      >
        {props.title.replace(/\s+(\S*)$/, '\xA0$1')}
      </TextFit>
    </div>
  );
}

SocialCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  category: PropTypes.string
};
