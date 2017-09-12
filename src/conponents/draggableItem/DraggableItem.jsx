import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import PropTypes from 'prop-types'
import s from './DraggableItem.css'
import DeleteIcon from './../icons/DeleteIcon'
import GeoIcon from './../icons/GeoIcon'

function DraggableItem({ itemData, onItemRemove, onItemClick }) {
  const onClick = (e) => {
    e.stopPropagation()
    onItemRemove(itemData.id)
  }
  return (
    <Draggable draggableId={itemData.id}>
      {provided => (
        <div>
          <div
            className={s.item}
            style={provided.draggableStyle}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
          >
            <div className="content">
              <h4>{`waypoint: ${itemData.content}`}</h4>
            </div>
            <div className={s.controlBlock} role="button">
              <DeleteIcon onClick={onClick} />
              <GeoIcon onClick={() => onItemClick(itemData.position)} />
            </div>
          </div>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  )
}

export default DraggableItem

DraggableItem.propTypes = {
  itemData: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    position: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
  onItemRemove: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
}
