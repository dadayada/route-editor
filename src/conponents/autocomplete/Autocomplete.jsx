import React from 'react'
import s from './Autocomplete.css'
import GeoIcon from './../icons/GeoIcon'

const Autocomplete = ({ items, onGeoButtonClick }) => {
  const list = items.map(el => (
    <li>
      <div className={s.item}>
        <button
          className={s.button}
          onClick={() => onGeoButtonClick(el.place_id)}
        >
          <GeoIcon />
        </button>
        <span className={s.description}>{el.description}</span>
      </div>
    </li>
  ))
  return (
    <div className={s.suggestions}>
      <ul>{list}</ul>
    </div>
  )
}

export default Autocomplete
