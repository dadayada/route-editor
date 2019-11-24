import React from 'react'
import PropTypes from 'prop-types'
import RightArrowIcon from '../icons/RightArrowIcon'
import LeftArrowIcon from './../icons/LeftArrowIcon'
import s from './SearchBox.css'

const SearchBox = ({ isOpen, onClick, onInput, onKeyDown }) => (
  <div className={s.inputWrapper} onKeyDown={onKeyDown}>
    <button className={`${s.arrowButton} ${s.button}`} onClick={onClick}>
      {isOpen ? <LeftArrowIcon /> : <RightArrowIcon />}
    </button>
    <input
      onInput={e => onInput(e.target.value)}
      className={s.input}
      type="text"
      placeholder="Search for places"
    />
  </div>
  )

export default SearchBox

SearchBox.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onInput: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
}
