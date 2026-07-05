import {httpRouter} from 'convex/server'
import {auth} from './auth'

const http = httpRouter()

// Registers the auth HTTP routes (token exchange, etc.) used by the browser.
auth.addHttpRoutes(http)

export default http
