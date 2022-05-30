import { Controller, Post, Body, Get, ParseIntPipe, Param, Put, } from '@nestjs/common'

import { AuthService } from './auth.service'
import {
    AuthCredentialsDTO,
    AuthCredentialsDTOByEmail,updateUserDTO
} from './dto/auth-cred.dto'
import { User } from './entities/user.entity'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('/login')
    async register(
        @Body() authCodeCreds: AuthCredentialsDTO
    ): Promise<{ token: string; isSubscribed: boolean; role: string }> {
        return this.authService.register(authCodeCreds)
    }

    @Put('/update/:id')
    async updateUser(
        @Body() authCodeCreds: updateUserDTO,
        @Param('id') id:string
    ): Promise<{}> {
        return this.authService.update(authCodeCreds, id)
    }

    @Get('/get-loogedin/:id')
    async getUser(
        @Param('id') id: any
    ): Promise<{}> {
        return this.authService.findById( id );
    }
    
    @Get('get-user/:id')
    async getUserById(
        @Param('id') id: any
    ): Promise<{}> {
        return this.authService.findById( id );
    }
    
    @Get('/all')
    async allUsers(): Promise<User[]> {
        return await this.authService.getAll()
    }

    
}

function id(id: any, authCodeCreds: AuthCredentialsDTOByEmail): { id: string } | PromiseLike<{ id: string }> {
    throw new Error('Function not implemented.')
}

