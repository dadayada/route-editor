import React, { Component } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import AppMap from '../map/AppMap'
import s from './App.css'
import Controls from '../controls/Controls'

const position = [37.505, -122.09]

const reorder = (list, startIndex, endIndex) => {
  const [removed] = list.splice(startIndex, 1)
  list.splice(endIndex, 0, removed)

  return list
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      waypoints: [],
      nextId: 3,
      center: position,
    }
    this.onMarkerDrag = this.onMarkerDrag.bind(this)
  }

  onDragEnd = (result) => {
    if (!result.destination) {
      return
    }
    const waypoints = reorder(
      this.state.waypoints,
      result.source.index,
      result.destination.index,
    )
    this.setState({ waypoints })
  }

  onMarkerDrag(e, id) {
    const { latlng } = e
    const newPosition = [latlng.lat, latlng.lng]
    const newWaypoints = this.state.waypoints.map((el) => {
      if (el.id === id) {
        return { id, position: newPosition, content: el.content }
      }
      return el
    })
    this.setState({ waypoints: newWaypoints })
  }

  onNewItem = (input) => {
    const { nextId, waypoints, center } = this.state
    this.setState({
      waypoints: [
        ...waypoints,
        {
          id: nextId,
          position: center,
          content: input,
        },
      ],
      nextId: nextId + 1,
    })
  }

  onItemRemove = (id) => {
    const waypoints = this.state.waypoints.filter(el => el.id !== id)
    this.setState({ waypoints })
  }

  onViewportChange = (e) => {
    this.setState({ center: e.center })
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className={s.appContainer}>
          <div className={s.controlsWrapper}>
            <Controls
              waypoints={this.state.waypoints}
              onNewItem={this.onNewItem}
              onItemRemove={this.onItemRemove}
            />
          </div>
          <div className={s.mapWrapper}>
            <AppMap
              waypoints={this.state.waypoints}
              center={position}
              onMarkerDrag={this.onMarkerDrag}
              onViewportChange={this.onViewportChange}
            />
          </div>
        </div>
      </DragDropContext>
    )
  }
}

export default App
