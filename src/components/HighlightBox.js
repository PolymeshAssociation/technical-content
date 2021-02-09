import React from 'react';
import styled from '@emotion/styled';
import {breakpoints} from 'gatsby-theme-apollo-core';
import IconInfo from "../assets/hi-info-n.svg"
import IconTip from "../assets/hi-tip-n.svg"
import IconWarn from "../assets/hi-warn-n.svg"

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
    margin: 0;
  }

  ${({ type }) => type==="info" && `
    background: #4A125E;
  `}

  ${({ type }) => type==="tip" && `
    background: #11D6CC;
  `}

  ${({ type }) => type==="warn" && `
    background: #E745F1;
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
      content: "Info";
      color: #4A125E;
    }
  `}

  ${({ type }) => type==="tip" && `
    &::before {
      content: "Tip";
      color: #11D6CC;
    }
  `}

  ${({ type }) => type==="warn" && `
    &::before {
      content: "Warning";
      color: #E745F1;
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
