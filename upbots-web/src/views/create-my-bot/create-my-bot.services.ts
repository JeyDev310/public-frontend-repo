import { http } from '@/services'

import { IUserBotCreateDto } from './create-my-bot.types'

class CreateMyBotService {
  createMyBot (payload: IUserBotCreateDto) {
    return http.post<IUserBotCreateDto>('/algobots/userbot', payload)
  }
}

export const createMyBotService = new CreateMyBotService()
