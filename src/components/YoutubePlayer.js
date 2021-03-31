import React from 'react';
import styled from '@emotion/styled';

const YoutubePlayerWrapper = styled.div({
  position: "relative",
  paddingTop: "56.25%"
});

const YoutubePlayerContent = styled.iframe({
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%"
});

export default function YoutubePlayer(props) {
  const videoUrl = "https://www.youtube-nocookie.com/embed/" + props.videoId + "?noref=true";

  return (
    <YoutubePlayerWrapper>
      <YoutubePlayerContent
          src={videoUrl}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          frameBorder="0"
          webkitallowfullscreen="true"
          mozallowfullscreen="true"
          allowFullScreen
      />
  </YoutubePlayerWrapper>
  );
}
