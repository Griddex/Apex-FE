import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIconTypeMap,
  useTheme,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { ISelectOption } from "../Selects/SelectItemsType";

const useStyles = makeStyles(() => ({
  listDialogContent: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 5,
  },
  listBorder: {
    height: 200,
    overflow: "auto",
    border: "1px solid #F7F7F7",
  },
}));

export interface IApexListMultiOptions {
  contentListOptions: ISelectOption[];
  selectedOptions: ISelectOption[];
  apexListemAction: (option: ISelectOption) => void;
  Icon: OverridableComponent<SvgIconTypeMap<any, "svg">> & {
    muiName: string;
  };
}

const ApexListMultiOptions = ({
  contentListOptions,
  selectedOptions,
  apexListemAction,
  Icon,
}: IApexListMultiOptions) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <List className={classes.listBorder}>
      {contentListOptions.length > 0 &&
        contentListOptions.map((option: ISelectOption, i: number) => {
          const optionIsSelected =
            selectedOptions.find((o) => o?.value === option?.value) !==
            undefined;

          return (
            <ListItem
              key={i}
              selected={optionIsSelected}
              button
              onClick={() => apexListemAction(option)}
              style={
                optionIsSelected
                  ? {
                      border: `1px solid ${theme.palette.primary.main}`,
                      backgroundColor: theme.palette.primary.light,
                    }
                  : {}
              }
            >
              <ListItemAvatar>
                <Icon color="primary" />
              </ListItemAvatar>
              <ListItemText>{option.label}</ListItemText>
            </ListItem>
          );
        })}
    </List>
  );
};

export default ApexListMultiOptions;
