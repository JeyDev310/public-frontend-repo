import { http } from '@/services'
import {
} from '@/types'
class AdminCreateBotService {
  createBot (payload: any) {
    return http.post<any>('/algobots/userbot', payload)
  }
}

export const adminCreateBotService = new AdminCreateBotService()
