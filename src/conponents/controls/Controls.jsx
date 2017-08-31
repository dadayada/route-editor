import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DroppableList from '../droppableList/DroppableList'
import s from './Controls.css'

class Controls extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
    }
  }

  onInput = (e) => {
    this.setState({ input: e.target.value })
  }

  onKeyPress = (e) => {
    if (e.charCode === 13) {
      this.props.onNewItem(this.state.input)
      this.setState({ input: '' })
      e.target.value = ''
    }
  }

  render() {
    const { waypoints, onItemRemove } = this.props
    return (
      <div className={s.controls}>
        <div className={s.inputWrapper}>
          <input
            className={s.input}
            type="text"
            placeholder="input new waypoint"
            onInput={this.onInput}
            onKeyPress={this.onKeyPress}
          />
        </div>
        <div className={s.itemList}>
          <DroppableList onItemRemove={onItemRemove} itemsData={waypoints} />
        </div>
      </div>
    )
  }
}

export default Controls

Controls.propTypes = {
  waypoints: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    position: PropTypes.arrayOf(PropTypes.number),
  })).isRequired,
  onItemRemove: PropTypes.func.isRequired,
  onNewItem: PropTypes.func.isRequired,
}
