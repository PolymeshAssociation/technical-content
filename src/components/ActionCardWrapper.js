import React from 'react';
import styled from '@emotion/styled';
import {breakpoints} from 'gatsby-theme-apollo-core';


const Wrapper = styled.div({
	marginBottom: "40px",
  paddingBottom: "40px",
  borderBottom: "1px solid #EDEDED"
});

const Title = styled.h3({
  marginBottom: "3rem"
});

const ContentWrapper = styled.div({
  display: "flex",
  flexWrap: "wrap",
  [breakpoints.smMd]: {
		display: "block"
  }
});


export default function ActionCardWrapper(props) {
  return (
    <Wrapper>
      <Title>{props.title}</Title>
      <ContentWrapper>
        {props.children}
      </ContentWrapper>
    </Wrapper>
  );
}
