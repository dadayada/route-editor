import React from 'react'
import PropTypes from 'prop-types'
import s from './LeftArrowIcon.css'

const RightArrowIcon = ({ onClick }) => (
  <svg viewBox="0 0 220.682 220.682" onClick={onClick} className={s.icon}>
    <polygon points="92.695,38.924 164.113,110.341 92.695,181.758 120.979,210.043 220.682,110.341 120.979,10.639 " />
    <polygon points="28.284,210.043 127.986,110.341 28.284,10.639 0,38.924 71.417,110.341 0,181.758 " />
  </svg>
)

export default RightArrowIcon

RightArrowIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
}
