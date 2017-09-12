import React, { Component } from 'react'
import RightArrowIcon from '../icons/RightArrowIcon'
import LeftArrowIcon from './../icons/LeftArrowIcon'
import SearchIcon from '../icons/SearchIcon'
import s from './SearchBox.css'

class SearchBox extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { isOpen, onClick, onInput } = this.props
    return (
      <div className={s.inputWrapper}>
        <button className={s.button}>
          {isOpen ? (
            <LeftArrowIcon onClick={onClick} />
          ) : (
            <RightArrowIcon onClick={onClick} />
          )}
        </button>
        <input
          onInput={e => onInput(e.target.value)}
          className={s.input}
          type="text"
          placeholder="Search places"
        />
        <button className={s.button}>
          <SearchIcon />
        </button>
      </div>
    )
  }
}

export default SearchBox
