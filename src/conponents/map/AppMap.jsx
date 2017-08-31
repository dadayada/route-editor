// @flow
import React, { Component } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import PropTypes from 'prop-types'
import Path from '../Path/Path'

class AppMap extends Component {
  render() {
    const { waypoints, center, onViewportChange } = this.props
    return (
      <Map
        zoom={8}
        center={center}
        style={{ height: '400px' }}
        onViewportChange={onViewportChange}
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
  center: PropTypes.arrayOf(PropTypes.number).isRequired,
  onViewportChange: PropTypes.func.isRequired,
}
