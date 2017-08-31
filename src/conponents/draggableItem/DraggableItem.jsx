import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import PropTypes from 'prop-types'
import s from './DraggableItem.css'

function DraggableItem({ itemData, onItemRemove }) {
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
            <div
              className={s.controlBlock}
              onClick={(e) => {
                onItemRemove(itemData.id)
              }}
              role="button"
            >
              x
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
}
