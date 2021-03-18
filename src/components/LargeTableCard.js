import React from 'react';
import styled from '@emotion/styled';
import {breakpoints} from 'gatsby-theme-apollo-core';

const ActionCardLarge = styled.div({
  flex: 1,
	position: "relative",
	margin: "0 15px",
  ":nth-child(odd)": {
    marginLeft: 0
  },
  ":nth-child(even)": {
    marginRight: 0
  },
});

const ActionCardImage = styled.img({
  width: "100%",
	border: "1px solid #cbcbcb"
});

const ActionCardTitle = styled.h3({
});

const ActionCardText = styled.p({
  paddingBottom: "30px"
});


export default function LargeTableCard(props) {
  return (
    <ActionCardLarge>
      <ActionCardImage src={props.imgSrc}></ActionCardImage>
      <ActionCardTitle>{props.title}</ActionCardTitle>
      <ActionCardText>{props.text}</ActionCardText>
      {props.children}
    </ActionCardLarge>
  );
}
