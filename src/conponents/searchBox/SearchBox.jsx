import React from 'react'
import RightArrowIcon from '../icons/RightArrowIcon'
import LeftArrowIcon from './../icons/LeftArrowIcon'
import SearchIcon from '../icons/SearchIcon'
import s from './SearchBox.css'

const SearchBox = ({ isOpen, onClick, onInput }) => (
  <div className={s.inputWrapper}>
    <button className={s.button} onClick={onClick}>
      {isOpen ? <LeftArrowIcon /> : <RightArrowIcon />}
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

export default SearchBox
