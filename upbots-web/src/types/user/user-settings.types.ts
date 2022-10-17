export interface IAlgobotFilters {
  exchanges: string[];
  pairs: string[];
  sortedByValue: { value: string; label: string; };
  status: { value: string; label: string; };
  strategy: { value: string; label: string; };
  isMyBots: boolean;
}

export interface IUserSettings {
  algobotFilters: IAlgobotFilters;
  darkMode: boolean;
  favoriteCurrency: { value: string; label: string; };
  userId: string;
}
