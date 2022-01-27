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

export interface IApexListSingle {
  contentList: any;
  selectedName: string;
  apexListemAction: (name: string) => void;
  Icon: OverridableComponent<SvgIconTypeMap<any, "svg">> & {
    muiName: string;
  };
}

const ApexListSingle = ({
  contentList,
  selectedName,
  apexListemAction,
  Icon,
}: IApexListSingle) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <List className={classes.listBorder}>
      {contentList &&
        contentList.map((name: string, i: number) => {
          return (
            <ListItem
              key={i}
              selected={name === selectedName}
              button
              onClick={() => apexListemAction(name)}
              style={
                name === selectedName
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
              <ListItemText>{name}</ListItemText>
            </ListItem>
          );
        })}
    </List>
  );
};

export default ApexListSingle;
