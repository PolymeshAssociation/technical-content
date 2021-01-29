import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.div({
  display: 'flex'
});

export default function Logo() {
  return (
    <Wrapper>
      <img src={'/polymesh-logo-c.png'} alt="Polymesh Logo" height="42" />
    </Wrapper>
  );
}

