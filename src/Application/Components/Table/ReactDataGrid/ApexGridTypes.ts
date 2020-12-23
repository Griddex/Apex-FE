export type IRawRow = Record<
  string,
  React.Key | Record<string, React.Key> | Record<string, React.Key>[]
>;

export type IRawTable = IRawRow[];

export interface ITableIconsOptions {
  [x: string]: { show: boolean; action?: () => void };
}
