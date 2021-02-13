import { CSSProperties } from "@material-ui/core/styles/withStyles";

export interface IExistingInputDeck {
  showChart: boolean;
  finalAction: () => void;
  containerStyle?: CSSProperties;
}
