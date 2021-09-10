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

  // const base64Regular = getBase64('/inter-all-400-normal.woff');

  const cssPath = require.resolve('@fontsource/inter/index.css');
  const fonts = fs
    .readFileSync(cssPath, 'utf-8');

  const imagePath = path.resolve(__dirname, '../assets/social-bg.jpg');
  const base64Image = fs.readFileSync(imagePath, 'base64');

  const logoPath = path.resolve(__dirname, '../assets/polymesh-icon.png');
  const base64Logo = fs.readFileSync(logoPath, 'base64');

  module.exports = {
    fonts,
    image: 'data:image/jpeg;base64,' + base64Image,
    logo: 'data:image/png;base64,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'
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
