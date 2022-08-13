import {
  DefaultBodyType,
  MockedResponse,
  PathParams,
  ResponseComposition,
  RestContext,
  RestRequest,
} from 'msw'

type API = (
  req: RestRequest<never, PathParams<string>>,
  res: ResponseComposition<DefaultBodyType>,
  ctx: RestContext
) => Promise<MockedResponse<DefaultBodyType>>

const USER = {
  name: '',
}

export const login: API = async (req, res, ctx) => {
  const { username } = await req.json<{ username: string }>()
  USER.name = username ?? ''

  if (username) {
    sessionStorage.setItem('is-authenticated', 'true')
    return res(ctx.status(200))
  }

  return res(
    ctx.status(403),
    ctx.json({
      errorMessage: '유저 이름을 등록 해주세요',
    })
  )
}

export const getUser: API = async (_, res, ctx) => {
  const isAuthenticated = sessionStorage.getItem('is-authenticated')

  if (!isAuthenticated) {
    return res(
      ctx.status(403),
      ctx.json({
        errorMessage: '유저 인증이 되지 않았습니다.',
      })
    )
  }

  return res(
    ctx.status(200),
    ctx.json({
      username: USER.name,
    })
  )
}
