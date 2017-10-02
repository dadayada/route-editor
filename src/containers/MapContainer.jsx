import { connect } from 'react-redux'
import React, { Component } from 'react'
import AppMap from './../components/map/AppMap'
import { MAP, WAYPOINTS } from './../redux/actions'

const changeWaypointPos = (e, id, waypoints) => {
  const { latlng } = e
  const newPosition = [latlng.lat, latlng.lng]
  const newWaypoints = waypoints.map((el) => {
    if (el.id === id) {
      return { id, position: newPosition, content: el.content }
    }
    return el
  })
  return newWaypoints
}

class ResizebleMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      height: document.documentElement.clientHeight,
    }
    window.addEventListener('resize', this.onResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }

  onResize = () =>
    this.setState({ height: document.documentElement.clientHeight })

  render() {
    const props = {
      ...this.props,
      height: this.state.height,
    }
    return <AppMap {...props} />
  }
}

const mapStateToProps = state => ({
  viewport: state.dynamicViewport,
  waypoints: state.waypoints,
})

const mapDispatchToProps = dispatch => ({
  onViewportChange: viewport => dispatch(MAP.VIEWPORT_CHANGED(viewport)),
  dispatchNewWaypoints: waypoints =>
    dispatch(WAYPOINTS.REPLACE_WAYPOINTS(waypoints)),
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onMarkerDrag: (e, id) =>
    dispatchProps.dispatchNewWaypoints(
      changeWaypointPos(e, id, stateProps.waypoints),
    ),
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  ResizebleMap,
)
