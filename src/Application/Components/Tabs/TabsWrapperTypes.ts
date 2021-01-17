export interface ITabPanel {
  children: JSX.Element;
  value: number;
  index: number;
}

export interface ITabData {
  label: string;
  displayed: boolean;
}
