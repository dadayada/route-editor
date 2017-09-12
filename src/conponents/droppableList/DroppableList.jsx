import React from 'react'
import PropTypes from 'prop-types'
import { Droppable } from 'react-beautiful-dnd'
import DraggableItem from './../draggableItem/DraggableItem'

function DroppableList({ itemsData, onItemRemove, onItemClick }) {
  return (
    <Droppable droppableId="itemList">
      {provided => (
        <div ref={provided.innerRef}>
          {itemsData.map(el => (
            <DraggableItem
              key={el.id}
              itemData={el}
              onItemRemove={onItemRemove}
              onItemClick={onItemClick}
            />
          ))}
        </div>
      )}
    </Droppable>
  )
}

export default DroppableList

DroppableList.propTypes = {
  itemsData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    position: PropTypes.arrayOf(PropTypes.number),
  })).isRequired,
  onItemRemove: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
}
