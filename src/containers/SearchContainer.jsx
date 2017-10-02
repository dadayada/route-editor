import { connect } from 'react-redux'
import React from 'react'
import PropTypes from 'prop-types'
import { getGeoCode, getSuggestions } from './../api'
import Autocomplete from '../components/autocomplete/Autocomplete'
import SearchBox from '../components/searchBox/SearchBox'
import { MAP, AUTOCOMPLETE } from '../redux/actions'

const mapStateToProps = state => ({
  suggestions: state.suggestions,
})

const mapDispatchToProps = dispatch => ({
  onGeoButtonClick: (placeId) => {
    getGeoCode(placeId).then((result) => {
      dispatch(MAP.SET_VIEWPORT(result))
      dispatch(AUTOCOMPLETE.CLEAR_SUGGESTIONS())
    })
  },
  onInput: (input) => {
    getSuggestions(input)
      .then((json) => {
        dispatch(AUTOCOMPLETE.FETCH_SUGGESTIONS_SUCCESS(json))
      })
      .catch((status) => {
        // eslint-disable-next-line no-console
        console.log(status)
        dispatch(AUTOCOMPLETE.FETCH_SUGGESTIONS_SUCCESS([]))
      })
  },
  onKeyDown: (e) => {
    if (e.keyCode === 27) {
      dispatch(AUTOCOMPLETE.CLEAR_SUGGESTIONS())
    }
  },
})

const Search = ({
  isOpen,
  suggestions,
  onArrowClick,
  onInput,
  onGeoButtonClick,
  onKeyDown,
}) => (
  <div>
    <SearchBox
      isOpen={isOpen}
      onClick={onArrowClick}
      onInput={onInput}
      onKeyDown={onKeyDown}
    />
    <Autocomplete items={suggestions} onGeoButtonClick={onGeoButtonClick} />
  </div>
)

Search.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onArrowClick: PropTypes.func.isRequired,
  onInput: PropTypes.func.isRequired,
  onGeoButtonClick: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
  })).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
