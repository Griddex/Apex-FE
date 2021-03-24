export interface IApexMuiSwitch {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  checkedColor: string;
  notCheckedColor: string;
}
