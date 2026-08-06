export interface TokenPayloadCreate {
  id: number   
  email: string
}

export interface TokenPayloadVerify {
  id: number
  email: string
  iat: number
  exp: number
}