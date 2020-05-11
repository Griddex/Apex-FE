import { makeStyles } from "@material-ui/core";
import React from "react";
import Dropzone from "react-dropzone";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    display: "flex",
    width: "70%",
    height: "95%",
  },
}));

const ImportExcel = (props) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>
    </Paper>
  );
};

ImportExcel.propTypes = {};

export default ImportExcel;
