import {
    IsString,
    IsEmail,
    IsNotEmpty,
    IsPhoneNumber,
    IsOptional,
} from 'class-validator'
import { Role } from '../enums/roles.enums'
import { AuthProvider } from '../enums/auth-provider.enum'

// Information about the user sent by the provider

export class ProviderInfoDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @IsString()
    name: string

    role: string

    @IsString()
    occupation: string
    @IsString()
    age: string

    @IsString()
    @IsNotEmpty()
    provider: AuthProvider

    phone: string

}

export class userProviderInfoDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @IsString()
    name: string

    @IsString()
    age: string

    @IsString()
    occupation: string

    role: string

    @IsString()
    @IsNotEmpty()
    provider: AuthProvider

    phone: string

}

export class ProviderInfoDTOTwo {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @IsString()
    name: string

    phone: string

    isSubscribed:boolean
    

}
export class updatedData {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @IsString()
    name: string

    phone: string

    isSubscribed:boolean
    

}