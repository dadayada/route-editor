// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import App from './conponents/app/app'
import { APP_CONTAINER_SELECTOR } from './../config'


const rootEl = document.querySelector(APP_CONTAINER_SELECTOR)

const wrapApp = AppComponent => (
  <AppContainer>
    <AppComponent />
  </AppContainer>
)

ReactDOM.render(wrapApp(App), rootEl)

if (module.hot) {
  // flow-disable-next-line
  module.hot.accept('./conponents/app/app', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./conponents/app/app').default
    ReactDOM.render(wrapApp(NextApp), rootEl)
  })
}
