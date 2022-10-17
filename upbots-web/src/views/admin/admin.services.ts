import { http } from '@/services'
import { IActiveUser } from './admin.types'
class AdminService {
  getDailyActiveUsers (start:Date, end:Date) {
    return http.get<IActiveUser[]>('/login-tracking', { params: { start, end } })
  }
}

export const adminService = new AdminService()
