import PropTypes from 'prop-types';
import React, {useRef, useState} from 'react';
import SectionNav from './section-nav';
import cn from 'classnames';
import styled from '@emotion/styled';
import useMount from 'react-use/lib/useMount';
import {HEADER_HEIGHT} from '../utils';
import {IconGithub} from '@apollo/space-kit/icons/IconGithub';
import {IconStar} from '@apollo/space-kit/icons/IconStar';
import {PageNav, breakpoints, colors} from 'gatsby-theme-apollo-core';
import {ReactComponent as SpectrumLogo} from '../assets/spectrum.svg';
import {withPrefix, useStaticQuery} from 'gatsby';
import {ReactComponent as IconClockSVG} from "../assets/fa-clock-light.svg";

const Wrapper = styled.div({
  display: 'flex',
  alignItems: 'flex-start'
});

const InnerWrapper = styled.div({
  flexGrow: 1,
  width: 0,
  '.api-ref': {
    h4: {
      code: {
        fontSize: '1.1em'
      }
    },
    '*:not(pre) > code[class*="language-"]': {
      padding: 0,
      background: 'none'
    }
  }
});

const BodyContent = styled.div({
  // style all anchors with an href and no prior classes
  // this helps avoid anchors with names and styled buttons
  'a[href]:not([class])': {
    color: colors.primary,
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline'
    },
    code: {
      color: 'inherit'
    }
  },
  [['h1', 'h2', 'h3', 'h4', 'h5', 'h6']]: {
    code: {
      whiteSpace: 'normal'
    },
    a: {
      color: 'inherit',
      textDecoration: 'none',
      ':hover': {
        color: colors.text2
      }
    }
  },
  '*:not(style) +': {
    [['h2', 'h3', 'h4', 'h5']]: {
      marginTop: -24,
      paddingTop: HEADER_HEIGHT
    }
  },
  img: {
    display: 'block',
    maxWidth: '100%'
  },
  '.mermaid svg': {
    maxWidth: '100%'
  }
});

const Aside = styled.aside({
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
  width: 200,
  maxHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
  marginTop: -36,
  padding: '40px 0',
  marginLeft: 40,
  position: 'sticky',
  top: HEADER_HEIGHT,
  [breakpoints.lg]: {
    display: 'none'
  },
  [breakpoints.md]: {
    display: 'block'
  },
  [breakpoints.smMd]: {
    display: 'none'
  },
  [breakpoints.sm]: {
    display: 'none'
  }
});

const AsideHeading = styled.h4({
  fontWeight: 600
});

const AsideLinkWrapper = styled.h5({
  display: 'flex',
  marginBottom: 0,
  ':not(:last-child)': {
    marginBottom: 16
  }
});

const AsideLinkInner = styled.a({
  display: 'flex',
  alignItems: 'center',
  color: colors.text2,
  textDecoration: 'none',
  cursor: 'pointer',
  ':hover': {
    color: colors.text3
  },
  svg: {
    width: 20,
    height: 20,
    marginRight: 6,
    fill: 'currentColor'
  }
});

function AsideLink(props) {
  return (
    <AsideLinkWrapper>
      <AsideLinkInner target="_blank" rel="noopener noreferrer" {...props} />
    </AsideLinkWrapper>
  );
}

function FeedbackLink(props) {
  function handleClick(e) {
    e.preventDefault();

    if (window.freddyWidget) {
      window.freddyWidget.show({
        custom_fields: {
          title: props.title
        }
      });
    }
  }

  return (
    <AsideLinkWrapper>
      <AsideLinkInner onClick={handleClick}>
        <IconStar style={{marginTop: -2}} /> Rate article
      </AsideLinkInner>
    </AsideLinkWrapper>
  );
}

FeedbackLink.propTypes = {
  title: PropTypes.string.isRequired
};

const EditLink = styled.div({
  display: 'none',
  marginTop: 48,
  justifyContent: 'flex-end',
  [breakpoints.lg]: {
    display: 'flex'
  },
  [breakpoints.md]: {
    display: 'none'
  },
  [breakpoints.sm]: {
    display: 'flex',
    marginTop: 24
  }
});

const TopInfoBar = styled.div`
  display: inline-flex;
  margin-bottom: 20px;
`

const SVGIconWrapper = styled.div`
  width: 20px;
  margin-right: 12px;
`

export default function PageContent(props) {
  const contentRef = useRef(null);
  const [imagesToLoad, setImagesToLoad] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  // fetch extra data (readingtime)
  const extraData = useStaticQuery(
    graphql`
      {
        allFile {
          nodes {
            relativePath
            childMdx {
              fields {
                readingTime {
                  minutes
                }
              }
            }
          }
        }
      }
    `
  );

  // We are using a static query to get a list of all reading times (build time!), to then filter down to the reading time we are actually looking for. This will run once for each page (potential build slowdown)! The field is being added by a transformer plugin, see gatsby-config module "gatsby-plugin-readingtime".
  const childMdx = extraData.allFile.nodes[0].childMdx
  //.filter(node => "https://git.b9lab.com/client-projects/polymath-developer-portal/portal-website/tree/main/content/" + node.relativePath == props.githubUrl)

  let readingTime = 0;
  if (childMdx) {
    readingTime = childMdx.fields.readingTime.minutes;
  }
  

  useMount(() => {
    if (props.hash) {
      // turn numbers at the beginning of the hash to unicode
      // see https://stackoverflow.com/a/20306237/8190832
      const hash = props.hash.toLowerCase().replace(/^#(\d)/, '#\\3$1 ');
      try {
        const hashElement = contentRef.current.querySelector(hash);
        if (hashElement) {
          hashElement.scrollIntoView();
        }
      } catch (error) {
        // let errors pass
      }
    }

    let toLoad = 0;
    const images = contentRef.current.querySelectorAll('img');
    images.forEach(image => {
      if (!image.complete) {
        image.addEventListener('load', handleImageLoad);
        toLoad++;
      }
    });

    setImagesToLoad(toLoad);
  });

  function handleImageLoad() {
    setImagesLoaded(prevImagesLoaded => prevImagesLoaded + 1);
  }

  const pageIndex = props.pages.findIndex(page => {
    const prefixedPath = withPrefix(page.path);
    return (
      prefixedPath === props.pathname ||
      prefixedPath.replace(/\/$/, '') === props.pathname
    );
  });

  const editLink = props.githubUrl && (
    <AsideLink href={props.githubUrl}>
      <IconGithub /> Edit on GitHub
    </AsideLink>
  );

  return (
    <Wrapper>
      <InnerWrapper>
        <BodyContent
          ref={contentRef}
          className={cn('content-wrapper', {
            'api-ref': props.apiReference
          })}
        >
          <TopInfoBar>
            <SVGIconWrapper>
              <IconClockSVG/>
            </SVGIconWrapper>
            Reading Time: {Math.ceil(readingTime)} min
          </TopInfoBar>
          {props.children}
        </BodyContent>
        <EditLink>{editLink}</EditLink>
        <PageNav
          prevPage={props.pages[pageIndex - 1]}
          nextPage={props.pages[pageIndex + 1]}
        />
      </InnerWrapper>
      <Aside>
        {props.headings.length > 0 && (
        <>
          <AsideHeading>In this Section</AsideHeading>        
          <SectionNav
            headings={props.headings}
            contentRef={contentRef}
            imagesLoaded={imagesLoaded === imagesToLoad}
          />
        </>
        )}
      </Aside>
    </Wrapper>
  );
}

PageContent.propTypes = {
  children: PropTypes.node.isRequired,
  pathname: PropTypes.string.isRequired,
  githubUrl: PropTypes.string,
  ffWidgetId: PropTypes.string,
  pages: PropTypes.array.isRequired,
  hash: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  apiReference: PropTypes.bool.isRequired,
  headings: PropTypes.array.isRequired,
  spectrumUrl: PropTypes.string
};
