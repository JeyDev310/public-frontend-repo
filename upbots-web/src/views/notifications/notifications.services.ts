import { http } from '@/services'
import { INotification } from '@/types'

class NotificationsService {
  fetchAll () {
    return http.get<INotification[]>('/notifications?s=500')
  }

  fetchUnreaded () {
    return http.get<INotification[]>('/notifications/unread')
  }

  fetchReaded () {
    return http.get<INotification[]>('/notifications/read')
  }

  read (notificationId: string) {
    return http.put<string>(`/notifications/read/${notificationId}`)
  }

  readAll () {
    return http.put('/notifications/readall')
  }

  unreadAll () {
    return http.put('/notifications/unreadall')
  }

  delete (notificationId: string) {
    return http.put<string>(`/notifications/delete/${notificationId}`)
  }
}

export const notificationsService = new NotificationsService()
