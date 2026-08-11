export interface TokenAccessPayloadCreate {
  id: number   
  email: string
}

export interface TokenRefreshPayloadCreate {
  id: number   
}
export interface TokenPayloadVerify {
  id: number
  email: string
  iat: number
  exp: number
}