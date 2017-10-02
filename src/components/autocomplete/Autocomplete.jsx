import React from 'react'
import PropTypes from 'prop-types'
import s from './Autocomplete.css'
import GeoIcon from './../icons/GeoIcon'

const Autocomplete = ({ items, onGeoButtonClick }) => {
  const list = items.map(el => (
    <li key={el.id}>
      <div className={s.item}>
        <button
          className={s.button}
          onClick={() => onGeoButtonClick(el.place_id)}
        >
          <GeoIcon />
        </button>
        <p className={s.description}>{el.description}</p>
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

Autocomplete.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
  })).isRequired,
  onGeoButtonClick: PropTypes.func.isRequired,
}
