// @flow
import React, { Component } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import PropTypes from 'prop-types'
import Path from '../Path/Path'

class AppMap extends Component {
  render() {
    const { waypoints, viewport, onViewportChange, height } = this.props
    return (
      <Map
        viewport={viewport}
        style={{ height: `${height}px` }}
        onViewportChange={onViewportChange}
        zoomControl={false}
      >
        <TileLayer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        {waypoints.length > 0 && <Path {...this.props} />}
      </Map>
    )
  }
}

export default AppMap

AppMap.propTypes = {
  waypoints: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    position: PropTypes.arrayOf(PropTypes.number),
  })).isRequired,
  viewport: PropTypes.shape({
    center: PropTypes.arrayOf(PropTypes.number),
    zoom: PropTypes.number,
  }).isRequired,
  onViewportChange: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
}
