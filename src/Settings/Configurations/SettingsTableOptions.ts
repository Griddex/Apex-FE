import { ITableIconsOptions } from "../../Application/Components/Table/ReactDataGrid/ApexGridTypes";

export const tableOptions: ITableIconsOptions = {
  sort: {
    show: true,
  },
  filter: {
    show: true,
  },
  save: {
    show: true,
    action: () => {
      alert("Save table icon");
    },
  },
};
