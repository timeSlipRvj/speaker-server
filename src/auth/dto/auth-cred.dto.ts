import {
    IsString,
    IsEmail,
    IsOptional,
    IsEnum,
    IsPhoneNumber,
    IsNumber,
    IsBoolean,
} from 'class-validator'
import { AuthProvider } from '../enums/auth-provider.enum'
import {Role} from "../enums/roles.enums"

export class AuthCredentialsDTO {
    @IsString()
    @IsEnum(AuthProvider)
    provider: AuthProvider

    id: number
    
    @IsEmail()
    email: string

    @IsString()
    name: string

    idToken: string

    @IsString()
    phone: string

    role:Role
    @IsString()
    occupation: string
    @IsString()
    age: string
    @IsBoolean()
    isSubscribed: boolean

}
export class updateUserDTO {
    @IsString()
    @IsEnum(AuthProvider)
    provider: AuthProvider

    id: number
    
    @IsEmail()
    email: string

    @IsString()
    name: string

    idToken: string

    @IsString()
    phone: string

    role:Role

    @IsString()
    age: string

    @IsString()
    occupation: string

    @IsBoolean()
    isSubscribed: boolean

}
export class AuthCredentialsDTOByEmail {

    @IsEmail()
    email: string

    @IsString()
    name: string
    
    phone: string
}
export class updatedAuth {

    @IsEmail()
    email: string

    @IsString()
    name: string
    
    phone: string

    @IsString()
    age: string

    @IsString()
    occupation: string
}