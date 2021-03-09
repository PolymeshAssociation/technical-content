import React from 'react';
import styled from '@emotion/styled';
import {breakpoints} from 'gatsby-theme-apollo-core';
import PropTypes from 'prop-types';

const Container = styled.div({
  display: 'flex',
  flexShrink: 0,
  width: 240,
  [breakpoints.lg]: {
    width: 'auto',
    marginRight: 0
  },
  [breakpoints.md]: {
    display: 'none'
  }
});

const MenuButton = styled.a({
  minWidth: 160,
  height: 40,
  padding: 8,
  textDecoration: "none",
  textAlign: "center",
  color: "#6C7D88",
  ':hover': {
    backgroundColor: "#f1f1f1"
  }
});


/*
const StyledIcon = styled(IconProceed)({
  height: '0.75em',
  marginLeft: '0.5em'
});
*/

export default function HeaderMenu(props) {
  return (
    <Container>
      {props.topMenu.map((menuItem, idx) => {

        return (
          <MenuButton
            href={menuItem.link}
          >
            {menuItem.name}
          </MenuButton>
        )
      })}
    </Container>
  );
}

HeaderMenu.propTypes = {
  topMenu: PropTypes.array.isRequired
};
