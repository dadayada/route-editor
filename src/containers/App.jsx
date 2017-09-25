import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { DragDropContext } from 'react-beautiful-dnd'
import s from './App.css'
import Controls from './../conponents/controls/Controls'
import MapContainer from './MapContainer'
import { WAYPOINTS } from '../redux/actions'

const App = ({ dispatch }) => {
  const onDragEnd = (result) => {
    if (!result.destination) {
      return
    }
    dispatch(
      WAYPOINTS.REORDER_WAYPOINTS({
        startIndex: result.source.index,
        endIndex: result.destination.index,
      }),
    )
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={s.appContainer}>
        <Controls />
        <div className={s.mapWrapper}>
          <MapContainer />
        </div>
      </div>
    </DragDropContext>
  )
}

export default connect()(App)

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
}
