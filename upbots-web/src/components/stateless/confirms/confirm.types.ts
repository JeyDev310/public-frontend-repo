export interface IConfirmRaw {
  title: string;
  body?: string;
  actionsName?: string[];
}

export interface IConfirm extends IConfirmRaw {
  id: number;
  resolve: (a: boolean) => void;
}
