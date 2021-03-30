import React from 'react';
import styled from '@emotion/styled';
import {breakpoints} from 'gatsby-theme-apollo-core';


const Wrapper = styled.div({
	marginbottom: "40px",
  paddingBottom: "40px",
  borderBottom: "1px solid #EDEDED",
});

const Title = styled.h2({
  marginBottom: "3rem"
});

const Text = styled.p({
});

const ContentWrapper = styled.div({
  [breakpoints.md]: {
    display: "block"
  },
  display: "flex",
  " table": {
    border: 0,
    width: "100%",
    " td": {
      padding: "0 15px 10px 0",
      border: 0,
      paddingBottom: "20px"
    },
    " td::first-child": {
      width: "40%",
      paddingRight: "10px"
    },
    " td > a": {
      textTransform: "uppercase",
      fontWeight: "700",
      fontSize: "10pt",
      color: "#1348E3 !important",
      textDecoration: "none"
    },
    "@media only screen and (min-width: 800px)": {
      display: "none"
    },
  }
});

const TableWrapper = styled.div({
  flex: "1 1 48%"
});

const ContentWrapperTables = styled.div({
  display: "flex",
  [breakpoints.md]: {
    display: "none"
  },
  " > div:first-child": {
    marginRight: "1%"
  },
  " > div:last-child": {
    marginLeft: "1%"
  },
  " table": {
    border: 0,
    width: "100%",
    " td": {
      padding: "0 15px 10px 0",
      border: 0,
      paddingBottom: "20px"
    },
    " td:first-child": {
      width: "40%",
      paddingRight: "10px",
    },
    " td > a": {
      textTransform: "uppercase",
      fontWeight: "700",
      fontSize: "10pt",
      color: "#1348E3",
      textDecoration: "none"
    },
  }
});

export default function LargeTableCardWrapper(props) {
  return (
    <Wrapper>
      <Title>{props.title}</Title>
      <Text>{props.text}</Text>
      <ContentWrapper>
        {props.children}
      </ContentWrapper>
      <ContentWrapperTables>
        {React.Children.map(props.children, (child) => (
          <TableWrapper>
              {child.props.children}
          </TableWrapper>
        ))}
      </ContentWrapperTables>
    </Wrapper>
  );
}
