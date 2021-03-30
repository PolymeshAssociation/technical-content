import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import {HEADER_HEIGHT} from '../utils';
import {breakpoints} from 'gatsby-theme-apollo-core';
import styles from '../../gatsby-theme-apollo-core/utils/styles';

const Wrapper = styled.header({
  top: 0,
  left: 0,
  zIndex: 1
});

const InnerWrapper = styled.div({
  maxWidth: styles.maxContentWidth,
  margin: "auto",
  display: 'flex',
  alignItems: 'center',
  height: HEADER_HEIGHT,
  padding: '0 24px'
});

export default function Header(props) {
  return (
    <Wrapper>
      {props.beforeContent}
      <InnerWrapper>{props.children}</InnerWrapper>
    </Wrapper>
  );
}

Header.propTypes = {
  beforeContent: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired
};
