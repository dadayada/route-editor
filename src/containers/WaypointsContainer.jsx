import { connect } from 'react-redux'
import WaypointsList from './../components/waypointsList/WaypointsList'
import { MAP, WAYPOINTS } from './../redux/actions'

const mapStateToProps = state => ({
  waypoints: state.waypoints,
})

const mapDispatchToProps = dispatch => ({
  onItemRemove: id => dispatch(WAYPOINTS.REMOVE_WAYPOINT(id)),
  onNewItem: content => dispatch(WAYPOINTS.ADD_WAYPOINT(content)),
  onItemClick: position => dispatch(MAP.SET_VIEWPORT(position)),
})

export default connect(mapStateToProps, mapDispatchToProps)(WaypointsList)
