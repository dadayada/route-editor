const autocomplete = new window.google.maps.places.AutocompleteService()
const geocoder = new window.google.maps.Geocoder()

export const getSuggestions = query =>
  new Promise((resolve, reject) => {
    autocomplete.getQueryPredictions(
      {
        input: query,
      },
      (predictions, status) => {
        if (status !== 'OK') {
          reject(status)
        }
        resolve(predictions)
      },
    )
  })

export const getGeoCode = id =>
  new Promise((resolve, reject) => {
    geocoder.geocode(
      {
        placeId: id,
      },
      (results, status) => {
        if (status !== 'OK') {
          reject(status)
        }
        resolve([
          results[0].geometry.location.lat(),
          results[0].geometry.location.lng(),
        ])
      },
    )
  })
