import { createReducer } from 'redux-act'
import { MAP, AUTOCOMPLETE, WAYPOINTS } from './actions'

const reorder = (list, startIndex, endIndex) => {
  const listCopy = [...list]
  const [removed] = listCopy.splice(startIndex, 1)
  listCopy.splice(endIndex, 0, removed)

  return listCopy
}

const startViewport = {
  center: [37.505, -122.09],
  zoom: 8,
}

const inititalState = {
  dynamicViewport: startViewport,
  staticViewport: startViewport,
  waypoints: [],
  nextId: 0,
  suggestions: [],
}

const reducer = createReducer(
  {
    [MAP.SET_VIEWPORT]: (state, position) => ({
      ...state,
      dynamicViewport: {
        zoom: state.staticViewport.zoom,
        center: position,
      },
      staticViewport: {
        zoom: state.staticViewport.zoom,
        center: position,
      },
    }),
    [MAP.VIEWPORT_CHANGED]: (state, viewport) => ({
      ...state,
      staticViewport: viewport,
    }),
    [WAYPOINTS.ADD_WAYPOINT]: (state, waypointContent) => ({
      ...state,
      nextId: state.nextId + 1,
      waypoints: [
        ...state.waypoints,
        {
          id: state.nextId,
          position: state.staticViewport.center,
          content: waypointContent,
        },
      ],
    }),
    [WAYPOINTS.REMOVE_WAYPOINT]: (state, id) => ({
      ...state,
      nextId: state.nextId,
      waypoints: state.waypoints.filter(el => el.id !== id),
    }),
    [WAYPOINTS.REPLACE_WAYPOINTS]: (state, waypoints) => ({
      ...state,
      nextId: state.nextId,
      waypoints,
    }),
    [WAYPOINTS.REORDER_WAYPOINTS]: (state, indices) => ({
      ...state,
      nextId: state.nextId,
      waypoints: reorder(state.waypoints, indices.startIndex, indices.endIndex),
    }),
    [AUTOCOMPLETE.FETCH_SUGGESTIONS_SUCCESS]: (state, predictions) => ({
      ...state,
      suggestions: predictions,
    }),
    [AUTOCOMPLETE.CLEAR_SUGGESTIONS]: state => ({
      ...state,
      suggestions: [],
    }),
  },
  inititalState,
)

export default reducer
