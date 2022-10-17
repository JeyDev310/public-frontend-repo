class LocalStorageService {
  public hasKey (key: string): boolean {
    return localStorage.getItem(key) !== null
  }

  public removeItem (key: string): void {
    return localStorage.removeItem(key)
  }

  public getItem<T> (key: string): T | undefined {
    const item: string | null = localStorage.getItem(key)

    try {
      return item !== null
        ? JSON.parse(item) as T
        : undefined
    } catch (error) {
      return undefined
    }
  }

  public setItem<T> (key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data))
  }

  public clear (): void {
    localStorage.clear()
  }
}

export const localStorageService = new LocalStorageService()
