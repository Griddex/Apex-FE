export interface IApexMuiSwitch {
  name: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  checkedColor: string;
  notCheckedColor: string;
}
