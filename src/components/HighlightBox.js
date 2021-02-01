import React from 'react';
import styled from '@emotion/styled';
import {breakpoints} from 'gatsby-theme-apollo-core';
import IconInfo from "../assets/hi-info.svg"
import IconTip from "../assets/hi-tip.svg"
import IconWarn from "../assets/hi-warn.svg"

const HighlightBoxWrapper = styled.div({
  background: "#EDEDED",
  display: "grid",
  [breakpoints.sm]: {
    display: "block"
  },
  width: "100%",
  "grid-template-columns": "120px auto",
  "align-items": "center",
  margin: "1.5em 0px",
  "box-shadow": "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)"
});

const HighlightBoxIcon = styled.div`
  padding: 20px;
  min-width: 120px;
  min-height: 120px;
  height: 100%;
  align-items: center;
  display: flex;
  img {
    width: 80px;
  }

  ${({ type }) => type==="info" && `
    background: #2F3B59;
  `}

  ${({ type }) => type==="tip" && `
    background: #EC1D24;
  `}

  ${({ type }) => type==="warn" && `
    background: #EDC434;
  `}
`;

const HighlightBoxContent = styled.div`
  padding: 20px;
  overflow: auto;
  
  &::before {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    display: block;
  }


  p {
    margin-bottom: 1.0rem;
  }
  
  ${({ type }) => type==="info" && `
    &::before {
      content: "Info!";
      color: #2F3B59;
    }
  `}

  ${({ type }) => type==="tip" && `
    &::before {
      content: "Tip!";
      color: #EC1D24;
    }
  `}

  ${({ type }) => type==="warn" && `
    &::before {
      content: "Warning!";
      color: #2F353F;
    }
  `}
`;

const IconImage = ({type}) => {
  let icon=IconInfo; // default

  if (type==="info") icon=IconInfo
  if (type==="tip") icon=IconTip
  if (type==="warn") icon=IconWarn

  return (
    <img src={icon} alt={`${type} icon`} />
  );
}

export default function HighlightBox(props) {
  return (
    <HighlightBoxWrapper type={props.type} className="HighlightBoxWrapper">
      <HighlightBoxIcon type={props.type}>
        <IconImage type={props.type}/>
      </HighlightBoxIcon>

      <HighlightBoxContent type={props.type}>
        {props.children}
      </HighlightBoxContent>
      
    </HighlightBoxWrapper>
  );
}
