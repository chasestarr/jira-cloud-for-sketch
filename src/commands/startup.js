import '../defaultImports'
import { trace, error } from '../logger'
import { isAuthorized, getBearerToken } from '../auth'
import { bearerTokenRefreshInterval } from '../config'

export default function () {
  trace('Registering auth token cache freshener...')
  COScript.currentCOScript().setShouldKeepAround(true)
  refreshAuthToken()
  setInterval(refreshAuthToken, bearerTokenRefreshInterval)
}

function refreshAuthToken () {
  if (isAuthorized()) {
    getBearerToken(true)
      .then(function () {
        trace('Auth token refreshed!')
      })
      .catch(function (e) {
        error(e)
      })
  } else {
    trace('Not authorized. Skipping auth token refresh.')
  }
}
