export interface ILineChartDataRaw {
  name: string;
  data: number | number[];
}

export interface ILineChartColors {
  line?: string;
  from: string;
  to: string;
}

export interface IBuildChartData {
  data: ILineChartDataRaw[];
  smooth?: number;
  symbol?: string;
  symbolSize?: number;
  outherIndex?: number | null;
  markers?: any;
}

export interface IGridPaddingConfig {
  left: string;
  right: string;
  top: string;
  bottom: string;
}
