import React from 'react';
import styled from '@emotion/styled';
import {breakpoints} from 'gatsby-theme-apollo-core';
import PropTypes from 'prop-types';

const Container = styled.div({
  display: 'flex',
  flexShrink: 0,
  paddingLeft: "87px",
  [breakpoints.lg]: {
    width: 'auto',
    marginRight: 0
  },
  [breakpoints.md]: {
    display: 'none'
  }
});

const MenuButton = styled.a({
  height: 38,
  padding: "8px 16px",
  textDecoration: "none",
  textAlign: "center",
  color: "#6C7D88",
  whiteSpace: 'nowrap',
  fontWeight: 700,
  fontSize: "1.1rem",
  ':hover': {
    color: "#1348E3"
  },
  '&.active': {
    color: "#1348E3"
  }
});


/*
const StyledIcon = styled(IconProceed)({
  height: '0.75em',
  marginLeft: '0.5em'
});
*/

function isSubSiteSelected(menuItem, pageContext) {
  return pageContext.subsite == menuItem.category;
}

export default function HeaderMenu(props) {
  return (
    <Container>
      {props.topMenu.map((menuItem, idx) => {
        return (
          <MenuButton
            href={menuItem.link}
            target={menuItem.external ? "_blank" : "_self"}
            className={
              isSubSiteSelected(menuItem, props.pageContext) ? 'active' : null
            }
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
