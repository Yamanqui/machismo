
export type PlotData = {
  group: string,
  values: number[],
};

export type Data = {
  title: string,
  sources: string[],
  times: string[],
  left: PlotData[],
  right: PlotData[],
  totals: number[],
  totalsLeft: number[],
  totalsRight: number[],
  maxValue: number,
  factor: number,
  label: string,
};

export enum DataState {
  Ready,
  Loading,
  Error,
}