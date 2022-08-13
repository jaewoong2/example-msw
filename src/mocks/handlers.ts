import { rest } from 'msw'
import { getUser, login } from './requests'

export const handlers = [
  // Handles a POST /login request
  rest.post('/login', login),
  // Handles a GET /user request
  rest.get('/user', getUser),
]
