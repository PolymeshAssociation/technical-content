import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.div({
  display: 'flex'
});

export default function Logo() {
  return (
    <Wrapper>
      <img src={'/polymath-logo.svg'} alt="Polymesh Logo" height="32" />
    </Wrapper>
  );
}

