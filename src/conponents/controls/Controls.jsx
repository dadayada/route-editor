import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'
import s from './Controls.css'
import SearchBox from '../searchBox/SearchBox'
import Autocomplete from '../autocomplete/Autocomplete'
import WaypointsList from './../waypointsList/WaypointsList'
import { getSuggestions } from '../../api/index'

class Controls extends Component {
  constructor(props) {
    super(props)
    this.state = {
      waypointInput: '',
      inputFocused: false,
      hidden: false,
      suggestions: [],
    }
  }

  onWaypointInput = (e) => {
    this.setState({ waypointInput: e.target.value })
  }

  onKeyPress = (e) => {
    if (e.charCode === 13) {
      this.props.onNewItem(this.state.waypointInput)
      this.setState({ waypointInput: '' })
      e.target.value = ''
    }
  }

  onFocus = () => this.setState({ inputFocused: true })

  onBlur = () => this.setState({ inputFocused: false })

  onToogleControls = () => this.setState({ hidden: !this.state.hidden })

  // eslint-disable-next-line react/sort-comp
  requestSuggestions = (input) => {
    getSuggestions(input)
      .then((json) => {
        this.setState({ suggestions: json })
      })
      .catch(() => {
        this.setState({ suggestions: [] })
      })
  }

  onSearchBoxInput = debounce(this.requestSuggestions, 300)

  render() {
    const { inputFocused, hidden, suggestions } = this.state
    const waypointsProps = {
      onBlur: this.onBlur,
      onFocus: this.onFocus,
      onKeyPress: this.onKeyPress,
      onInput: this.onWaypointInput,
      inputFocused,
      ...this.props,
    }
    return (
      <div className={`${s.controlsWrapper} ${hidden ? s.hidden : ''}`}>
        <div className={s.searchWrapper}>
          <SearchBox
            isOpen={!hidden}
            onClick={this.onToogleControls}
            onInput={this.onSearchBoxInput}
          />
          <Autocomplete items={suggestions} />
        </div>
        <WaypointsList {...waypointsProps} />
      </div>
    )
  }
}

export default Controls

Controls.propTypes = {
  waypoints: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      content: PropTypes.string,
      position: PropTypes.arrayOf(PropTypes.number),
    }),
  ).isRequired,
  onItemRemove: PropTypes.func.isRequired,
  onNewItem: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
}
