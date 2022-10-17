import { http } from '@/services'
import { IBanner } from '../types/banner'

class BannerService {
  createBanner (banner: IBanner) {
    return http.post<IBanner>('/banners', banner)
  }

  getBanners () {
    return http.get<IBanner[]>('/banners')
  }

  removeBanner (bannerId: string) {
    return http.delete<IBanner[]>(`/banners/${bannerId}`)
  }
}

export const bannerService = new BannerService()
