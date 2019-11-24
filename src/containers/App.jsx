import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { DragDropContext } from 'react-beautiful-dnd'
import s from './App.css'
import Controls from '@/components/controls/Controls'
import MapContainer from './MapContainer'
import { WAYPOINTS, MAP } from '@/redux/actions'

class App extends Component {
  constructor(props) {
    super(props)
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        props.dispatch(
          MAP.SET_VIEWPORT([
            position.coords.latitude,
            position.coords.longitude,
          ]),
        )
      })
    }
  }

  onDragEnd = (result) => {
    if (!result.destination) {
      return
    }
    this.props.dispatch(
      WAYPOINTS.REORDER_WAYPOINTS({
        startIndex: result.source.index,
        endIndex: result.destination.index,
      }),
    )
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className={s.appContainer}>
          <Controls />
          <div className={s.mapWrapper}>
            <MapContainer />
          </div>
        </div>
      </DragDropContext>
    )
  }
}

export default connect()(App)

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
}
