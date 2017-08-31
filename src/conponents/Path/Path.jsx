// @flow

import React from 'react'
import { Polyline, Marker, Popup, LayerGroup } from 'react-leaflet'
import PropTypes from 'prop-types'

function Path({ waypoints, onMarkerDrag }) {
  const markers = waypoints.map(el =>
    (<Marker
      key={el.id}
      position={el.position}
      draggable
      ondrag={e => onMarkerDrag(e, el.id)}
    >
      <Popup>
        <span>{el.content}</span>
      </Popup>
    </Marker>),
  )
  const dots = waypoints.map(el => el.position)
  return (
    <LayerGroup>
      {markers}
      <Polyline positions={dots} />
    </LayerGroup>
  )
}

export default Path

Path.propTypes = {
  waypoints: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    position: PropTypes.arrayOf(PropTypes.number),
  })).isRequired,
  onMarkerDrag: PropTypes.func.isRequired,
}

