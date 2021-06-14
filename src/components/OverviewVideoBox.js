import React from 'react';
import styled from '@emotion/styled';
import {breakpoints} from 'gatsby-theme-apollo-core';
import YoutubePlayer from "./YoutubePlayer"

const OverviewVideoBoxWrapper = styled.div({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #EDEDED",
    marginBottom: "40px",
    paddingBottom: "40px",
    marginTop: "20px",
});

const ContentWrapper = styled.div({
    width: "45%",
    marginBottom: "20px",
    [breakpoints.xl]: {
        width: "100%",
        maxWidth: "unset"
    }
}); 

const Title = styled.h3({});

const VideoWrapper = styled.div({
    width: "45%",
    [breakpoints.xl]: {
        width: "100%",
        maxWidth: "unset"
    }
});

export default function OverviewVideoBox(props) {
    return (
      <OverviewVideoBoxWrapper>
        <ContentWrapper>
          <Title>{props.title}</Title>
          {props.children}
        </ContentWrapper>
        <VideoWrapper>
            <YoutubePlayer videoId={props.videoId}/>
        </VideoWrapper>
      </OverviewVideoBoxWrapper>
    );
}
