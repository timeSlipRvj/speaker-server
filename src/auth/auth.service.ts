import {
    Injectable,
    UnauthorizedException,
    ConflictException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { OAuth2Client } from 'google-auth-library'
import { UserRepository } from './repositories/user.repository'
import { JwtPayload, JwtPayloadByEmail } from './jwt/jwt-payload.interface'
import {
    AuthCredentialsDTO,
    AuthCredentialsDTOByEmail,
    updatedAuth,updateUserDTO
} from './dto/auth-cred.dto'
import { ProviderInfoDTO, ProviderInfoDTOTwo, userProviderInfoDTO} from './dto/provider-info.dto'
import { User } from './entities/user.entity'

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) { }

    register = async (
        authCodeCreds: AuthCredentialsDTO
    ): Promise<{
        token: string
        isSubscribed: boolean
        role: string
        userdata: any
    }> => {
        const { idToken } = authCodeCreds
        console.log("========= authCodeCreds ===========")
        console.log(authCodeCreds)
        if (!this.verify(idToken)) {
            throw new UnauthorizedException('Authentication Failed')
        }

        const { name, email, phone, provider, role, age, occupation } = authCodeCreds
        // const role = role
        const userObj: userProviderInfoDTO = {
            email,
            name,
            phone,
            provider,
            role,
            age,
            occupation
        }
        try {
            let user = await this.userRepository.findOne({ email })
            if (!user || user == undefined) {
                user = await this.userRepository.register(userObj)
                console.log("========= true=========");
                console.log(user)
            }
            // Create a jwt token from the given info
            const payload: JwtPayload = {
                provider,
                id: user.id,
            }
            const token = this.jwtService.sign(payload)
            return {
                token,
                isSubscribed: user.subscribed,
                role: user.role,
                userdata: user,
            }
        } catch (e) {
            throw new ConflictException(e)
        }
    }

    // registerByEmail = async (
    //     authCodeCreds: AuthCredentialsDTOByEmail
    // ): Promise<{}> => {
    //     const { name, email, phone } = authCodeCreds
    //     const role = Role.USER
    //     const userObj: ProviderInfoDTOTwo = {
    //         email,
    //         name,
    //         phone,
    //     }
    //     try {
    //         let user = await this.userRepository.findOne({ email })
    //         if (!user) {
    //             user = await this.userRepository.registerByEmail(userObj)
    //         }
    //         // Create a jwt token from the given info
    //         // const payload: JwtPayloadByEmail = {
    //         //     id: user.id,
    //         // }
    //         // const token = this.jwtService.sign(payload)
    //         return {
    //             isSubscribed: user.subscribed,
    //             role: user.role,
    //             email: user.email,
    //             phone: user.phone,
    //         }
    //     } catch (e) {
    //         console.log(e)
    //         throw new ConflictException(e)
    //     }
    // }

    update = async (
        authCodeCreds: updatedAuth,
        id: string
    ): Promise<{}> => {
        try {
            let data = await this.userRepository.findOne(id);
            let updated = Object.assign(data, authCodeCreds);
            console.log(updated,"updatedupdated")
            const newOne = await this.userRepository.save(updated);
            return newOne
        } catch (e) {
            throw new ConflictException(e)
        }
    }
    async findUser(id: any): Promise<User> {
        return this.userRepository.findOne( { where: { id: id } } );
    }

    async findById( id: any ): Promise<User> {
        return this.userRepository.findOne({ where: { id: id } } );
    }

    async verify(token: string): Promise<any> {
        try {
            await new OAuth2Client(
                process.env.GOOGLE_OAUTH_CLIENT_ID
            ).verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_OAUTH_CLIENT_ID,
            })
            return true
        } catch (e) {
            return false
        }
    }

    async getAll(): Promise<User[]> {
        return this.userRepository.find({})
    }
}
