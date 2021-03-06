import { AuthProvider } from '../enums/auth-provider.enum'

export interface JwtPayload {
    provider: AuthProvider
    id: number
}
export interface JwtPayloadByEmail {
    id: number
}