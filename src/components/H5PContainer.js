import React from 'react';
import styled from '@emotion/styled';

export default class H5PContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.initH5p(this.props.locations);
  }

  async initH5p(contentLocations) {
    const { H5P } = require('h5p-standalone');

    const options = {
      frameJs: '/js/h5p/frame.bundle.js',
      frameCss: '/css/h5p/h5p.css'
    };

    for (var i = 0; i < contentLocations.length; i++) {
      const element = document.getElementById('h5p_container_' + i);
      const h5p = await new H5P(element, contentLocations[i], options);
    }
  }

  render() {
    const background = "#ffffff";
    const width = "100%";
    const minHeight = "200px";

    const H5PContainerWrapper = styled.div({
      background: background,
      width: width,
      minHeight: minHeight
    });

    var containers = [];

    for (var i = 0; i < this.props.locations.length; i++) {
      var id = "h5p_container_" + i;
      containers.push(
        <H5PContainerWrapper className="h5p-container-wrapper" id={id}>
          {this.props.children}  
        </H5PContainerWrapper>
      );
    }

    return containers;
  }
}
