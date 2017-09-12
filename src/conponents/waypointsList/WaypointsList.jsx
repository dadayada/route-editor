import React from 'react'
import DroppableList from '../droppableList/DroppableList'
import s from './WaypointsList.css'

const WaypointsList = ({
  waypoints,
  onItemRemove,
  onItemClick,
  onFocus,
  onInput,
  onKeyPress,
  onBlur,
  inputFocused,
}) => (
  <div className={s.waypointsList}>
    <div className={s.waypointsHeader}>Waypoints</div>
    <div
      className={`${s.inputWrapper} ${inputFocused
        ? s.inputWrapperFocused
        : ''}`}
    >
      <input
        className={s.input}
        type="text"
        placeholder="input new waypoint"
        onInput={onInput}
        onKeyPress={onKeyPress}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
    <div className={s.itemList}>
      <DroppableList
        onItemRemove={onItemRemove}
        itemsData={waypoints}
        onItemClick={onItemClick}
      />
    </div>
  </div>
)

export default WaypointsList

