// @flow
import React, { Component, useState, useEffect } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import PropTypes from 'prop-types'
import Path from '@components/Path/Path'


class AppMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewport: props.viewport,
    }
  }
  componentDidUpdate(){
    console.log(this.state.viewport)
  }
  render(){ 
    return (
      <Map
        viewport={this.state.viewport}
        style={{ height: `${this.props.height}px` }}
        trackResize
        onViewportChange={this.props.onViewportChange}
        zoomControl={false}
      >
        <TileLayer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          // eslint-disable-next-line max-len
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a>"
        />
        {this.props.waypoints.length > 0 && <Path {...this.props} />}
      </Map>
)}
}

export default AppMap

AppMap.propTypes = {
  waypoints: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      content: PropTypes.string,
      position: PropTypes.arrayOf(PropTypes.number),
    }),
  ).isRequired,
  viewport: PropTypes.shape({
    center: PropTypes.arrayOf(PropTypes.number),
    zoom: PropTypes.number,
  }).isRequired,
  onViewportChange: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
}
