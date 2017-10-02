import React, { Component } from 'react'
import s from './Controls.css'
import SearchContainer from '../../containers/SearchContainer'
import WaypointsContainer from '../../containers/WaypointsContainer'

class Controls extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hidden: false,
    }
  }

  onToogleControls = () => this.setState({ hidden: !this.state.hidden })

  render() {
    const { hidden } = this.state
    return (
      <div className={`${s.controlsWrapper} ${hidden ? s.hidden : ''}`}>
        <div className={s.searchWrapper}>
          <SearchContainer
            isOpen={!hidden}
            onArrowClick={this.onToogleControls}
          />
        </div>
        <WaypointsContainer />
      </div>
    )
  }
}

export default Controls
