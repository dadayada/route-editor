import { connect } from 'react-redux'
import React from 'react'
import { getGeoCode, getSuggestions } from './../api'
import Autocomplete from '../conponents/autocomplete/Autocomplete'
import SearchBox from '../conponents/searchBox/SearchBox'
import { MAP, AUTOCOMPLETE } from '../redux/actions'

const mapStateToProps = state => ({
  suggestions: state.suggestions,
})

const mapDispatchToProps = dispatch => ({
  onGeoButtonClick: (placeId) => {
    getGeoCode(placeId).then(result => dispatch(MAP.SET_VIEWPORT(result)))
  },
  onInput: (input) => {
    getSuggestions(input)
      .then((json) => {
        dispatch(AUTOCOMPLETE.FETCH_SUGGESTIONS_SUCCESS(json))
      })
      .catch(() => {
        dispatch(AUTOCOMPLETE.FETCH_SUGGESTIONS_SUCCESS([])) // ololo
      })
  },
})

const Search = ({
  isOpen,
  suggestions,
  onArrowClick,
  onInput,
  onGeoButtonClick,
}) => (
  <div>
    <SearchBox isOpen={isOpen} onClick={onArrowClick} onInput={onInput} />
    <Autocomplete items={suggestions} onGeoButtonClick={onGeoButtonClick} />
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(Search)
