import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Typography,
  useTheme,
} from "@material-ui/core";
import React from "react";
import CenteredStyle from "../../../Application/Components/Styles/CenteredStyle";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import CheckBoxOutlineBlankOutlinedIcon from "@material-ui/icons/CheckBoxOutlineBlankOutlined";
import { TUseState } from "../../../Application/Types/ApplicationTypes";
import { IDragItem } from "./ChartCategory";

export interface IChartCategoryVariable {
  dragItem: IDragItem;
  setHasDropped: TUseState<boolean>;
}

const ChartCategoryVariable = ({
  dragItem,
  setHasDropped,
}: IChartCategoryVariable) => {
  const theme = useTheme();
  const { id, name, title } = dragItem;
  // return (
  //   <CenteredStyle>
  //     <MenuItem onClick={() => {}}>
  //       <ListItemIcon style={{ minWidth: 36 }}>{titleAbbrev}</ListItemIcon>
  //       <Typography variant="inherit">{title}</Typography>
  //       <ListItemIcon
  //         style={{ minWidth: 36, color: theme.palette.secondary.main }}
  //       >
  //         {"X"}
  //       </ListItemIcon>
  //     </MenuItem>
  //   </CenteredStyle>
  // );

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <CheckBoxOutlineBlankOutlinedIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        // secondary={secondary ? 'Secondary text' : null}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete">
          <CloseOutlinedIcon onClick={() => setHasDropped(false)} />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default ChartCategoryVariable;
