import { List, ListItem, ListItemText, Typography } from "@material-ui/core";
import React from "react";

const TableMappingErrors = ({ errors }: { errors: React.Key[] }) => {
  return (
    <React.Fragment>
      <Typography color="inherit">Duplicates:</Typography>
      <List dense>
        {errors.map((error, i) => {
          return (
            <ListItem key={i}>
              <ListItemText>{error}</ListItemText>
            </ListItem>
          );
        })}
      </List>
    </React.Fragment>
  );
};

export default TableMappingErrors;
