import { TDropdownOption } from '@/types/general.types'

export interface ITradersFilters {
  search: string;
  status: TDropdownOption;
  strategy: TDropdownOption;
  exchanges: string[];
  pairs: string[];
  sortedBy: TDropdownOption;
}

export type TTradersFiltersKey = 'search' | 'status' | 'strategy' | 'exchanges' | 'pairs' | 'sortedBy'
