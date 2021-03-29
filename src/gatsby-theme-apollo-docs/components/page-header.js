import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import {colors} from 'gatsby-theme-apollo-core';
import {breakpoints} from 'gatsby-theme-apollo-core';

const Heading = styled.h1({
  ':not(:last-child)': {
    marginBottom: 8
  },
  paddingTop: "50px",
  [breakpoints.md]: {
    paddingTop: "80px"
  },
  [breakpoints.sm]: {
    paddingTop: "50px"
  }
});

const Subheading = styled.h3({
  color: colors.text2
});

export default function PageHeader(props) {
  return (
    <div className="header-wrapper">
      <Heading>{props.title}</Heading>
      {props.description && <Subheading>{props.description}</Subheading>}
    </div>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string
};
