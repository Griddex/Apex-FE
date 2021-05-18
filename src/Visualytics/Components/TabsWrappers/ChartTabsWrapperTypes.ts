export interface IChartTabPanel {
  children: JSX.Element;
  value: number;
  index: number;
}

export interface ISubContextTabData {
  name: string;
  label?: string;
  displayed?: boolean;
  icon: () => JSX.Element;
}

export interface ISubContextTabPanel {
  name: string;
  component: () => JSX.Element;
}
