import Logo from './logo';
import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import breakpoints from '../utils/breakpoints';
import styled from '@emotion/styled';
import {colors} from '../utils/colors';
import {transparentize} from 'polished';

const Container = styled.aside({
  flexShrink: 0,
  width: 312,
  height: '100vh',
  padding: 24,
  overflowY: 'auto',
  overflowX: 'hidden',
  position: 'sticky',
  top: 0
});

const ResponsiveContainer = styled(Container)(props => ({
  paddingTop: "96px",
  maxHeight: "calc(100% - 72px)",
  [breakpoints.md]: {
    paddingTop: "25px",
    maxHeight: "unset",
    height: '100%',
    backgroundColor: 'white',
    boxShadow: `0 0 48px ${transparentize(0.75, 'black')}`,
    position: 'fixed',
    zIndex: 2,
    opacity: props.open ? 1 : 0,
    visibility: props.open ? 'visible' : 'hidden',
    transform: props.open ? 'none' : 'translateX(-100%)',
    transitionProperty: 'transform, opacity, visibility',
    transitionDuration: '150ms',
    transitionTimingFunction: 'ease-in-out'
  }
}));

const Header = styled.div({
  display: 'flex',
  marginBottom: 24
});

const StyledLink = styled.a({
  color: colors.text1,
  textDecoration: 'none'
});

const MobileSiteNavWrapper = styled.div({
  display: "none",
  width: "100%%",
  [breakpoints.md]: {
    display: "inline-grid"
  }
});

const MobileMenuButton = styled.a({
  padding: "4px 0px",
  textDecoration: "none",
  textAlign: "left",
  color: "#6C7D88",
  whiteSpace: 'nowrap',
  fontWeight: 700,
  fontSize: "1.1rem",
  ':hover': {
    color: "#1348E3"
  },
  '&.active': {
    color: "#1348E3",
    pointerEvents: 'none'
  }
});


function isSubSiteSelected(menuItem, pageContext) {
  return pageContext.subsite == menuItem.category;
}

const Sidebar = React.forwardRef((props, ref) => {
  const content = (
    <Fragment>
      <div className={props.className}>{props.children}</div>
    </Fragment>
  );

  if (props.responsive) {
    return (
      <ResponsiveContainer ref={ref} open={props.open}>
        <MobileSiteNavWrapper>
          {props.topMenu.map((menuItem, idx) => {
            return (
              <MobileMenuButton
                href={menuItem.link}
                target={menuItem.external ? "_blank" : "_self"}
                className={
                  isSubSiteSelected(menuItem, props.pageContext) ? 'active' : null
                }
              >
                {menuItem.name}
              </MobileMenuButton>
            )
          })}
        </MobileSiteNavWrapper>
        {content}
      </ResponsiveContainer>
    );
  }

  return <Container>{content}</Container>;
});

Sidebar.displayName = 'Sidebar';

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
  responsive: PropTypes.bool,
  logoLink: PropTypes.string,
  className: PropTypes.string,
  topMenu: PropTypes.array,
  pathname: PropTypes.string,
  pageContext: PropTypes.array
};

Sidebar.defaultProps = {
  logoLink: '/'
};

export default Sidebar;
