import { EntityRepository, Repository } from 'typeorm'
import { User } from '../entities/user.entity'
import { InternalServerErrorException } from '@nestjs/common'
import { ProviderInfoDTO, ProviderInfoDTOTwo, updatedData } from '../dto/provider-info.dto'
import { updatedAuth } from '../dto/auth-cred.dto'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    register = async (userInfo: ProviderInfoDTO): Promise<User> => {
        const { email, provider, name, role, phone, occupation, age } = userInfo

        const user = this.create()
        user.email = email
        user.provider = provider
        user.name = name
        user.role = role
        user.occupation = occupation
        user.age = age
        user.created_at = new Date()
        if (phone) user.phone = phone

        try {
            await user.save()
            return user
        } catch (error) {
            throw new InternalServerErrorException('Some error occured')
        }
    }

    updateData = async (userInfo: updatedAuth): Promise<User> => {
        const { email, name, phone, age, occupation } = userInfo
        // let toUpdate = await this.userRepository.findOne(id);
        const user = this.create()
        user.email = email
        user.name = name
        user.created_at = new Date()
        user.age = age
        user.occupation = occupation
        try {
            await user.save()
            return user
        } catch (error) {
            console.log(error, "dsfjsf")
            throw new InternalServerErrorException('Some error occured')
        }
    }
    getUserWithBookmarks = async (user: User) => {
        return this.findOne(user.id, {
            relations: ['bookmarks'],
        })
    }
}
