const autocomplete = new window.google.maps.places.AutocompleteService()

export const getSuggestions = query => new Promise((resolve, reject) => {
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
