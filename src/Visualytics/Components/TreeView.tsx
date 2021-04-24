import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import SvgIcon from "@material-ui/core/SvgIcon";
import Typography from "@material-ui/core/Typography";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import TreeItem, { TreeItemProps } from "@material-ui/lab/TreeItem";
import TreeView from "@material-ui/lab/TreeView";
import { useSnackbar } from "notistack";
import React from "react";
import { useDrag } from "react-dnd";
import Dropzone from "react-dropzone";
import { useDispatch } from "react-redux";
import { animated, useSpring } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support
import * as xlsx from "xlsx";
import {
  hideDialogAction,
  showDialogAction,
} from "../../Application/Redux/Actions/DialogsAction";
import getTableHeaders from "../../Application/Utils/GetTableHeaders";
import ItemTypes from "../Utils/DragAndDropItemTypes";
import { useTheme } from "@material-ui/core";
import {
  ButtonProps,
  DialogStuff,
} from "./../../Application/Components/Dialogs/DialogTypes";

function MinusSquare(props: any) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props: any) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function CloseSquare(props: any) {
  return (
    <SvgIcon
      className="close"
      fontSize="inherit"
      style={{ width: 14, height: 14 }}
      {...props}
    >
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}

function TransitionComponent(props: { in?: boolean }) {
  const style = useSpring({
    from: { opacity: 0, transform: "translate3d(20px,0,0)" },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

const StyledTreeItem = withStyles((theme) => ({
  iconContainer: {
    "& .close": {
      opacity: 0.3,
    },
  },
  group: {
    marginLeft: 7,
    paddingLeft: 18,
    borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
  },
}))((props: TreeItemProps) => {
  const { label } = props;

  const [{ isDragging }, drag] = useDrag({
    item: { label, type: ItemTypes.TABLE_COLUMNDATA },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        alert(`You dropped ${item.label} into ${dropResult.name}`);
      }
    },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  });
  const opacity = isDragging ? 0.4 : 1;

  return (
    <TreeItem
      ref={drag}
      style={{ opacity }}
      {...props}
      TransitionComponent={TransitionComponent}
    />
  );
});

const useStyles = makeStyles((theme) => ({
  rootTreeView: {
    height: 250,
    width: "100%",
    maxWidth: 300,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: 500,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    border: "1px solid #C4C4C4",
    overflow: "auto",
  },
  itemIcon: {
    color: theme.palette.primary.main,
    minWidth: 30,
  },
  listDialogContent: { display: "flex", flexDirection: "column" },
  listBorder: {
    height: 200,
    overflow: "auto",
    border: "1px solid #F7F7F7",
  },
}));

export default function CustomizedTreeView() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const [selectedListItem, setSelectedListItem] = React.useState("");
  const [
    inputDeckWorkbook,
    setInputDeckWorkbook,
  ] = React.useState<xlsx.WorkBook>({} as xlsx.WorkBook);
  const { enqueueSnackbar } = useSnackbar();

  const [worksheetNames, setWorksheetNames] = React.useState<string[]>([]);
  const [selectedWorksheetName, setSelectedWorksheetName] = React.useState("");
  const [selectedWorksheetData, setSelectedWorksheetData] = React.useState<
    Record<string, React.Key>[]
  >([]);

  const SelectWorksheetDialogContent = () => {
    return (
      <div className={classes.listDialogContent}>
        <Typography variant="h6">
          Workbook contains more than one worksheet. Please select the worksheet
          that contains your data
        </Typography>
        <List className={classes.listBorder}>
          {worksheetNames &&
            worksheetNames.map((name, i) => (
              <ListItem
                key={i}
                selected={name === selectedListItem}
                button
                onClick={() => {
                  setSelectedListItem(name);
                }}
              >
                <ListItemIcon className={classes.itemIcon}>
                  <DescriptionOutlinedIcon />
                </ListItemIcon>
                <ListItemText>{name}</ListItemText>
              </ListItem>
            ))}
        </List>
      </div>
    );
  };

  const prepareSelectWorksheetRoute = (selectedWorksheetName: string) => {
    const selectedWorksheetDataXLSX =
      inputDeckWorkbook.Sheets[selectedWorksheetName];
    const selectedWorksheetData = xlsx.utils.sheet_to_json(
      selectedWorksheetDataXLSX
    );

    if (selectedWorksheetData.length === 0) {
      enqueueSnackbar("Empty worksheet!", { persist: false, variant: "error" });
    }
  };

  const SelectWorksheetDialogActions = (selectedWorksheetName: string) => {
    const buttonsData: ButtonProps[] = [
      {
        title: "Cancel",
        variant: "contained",
        color: "secondary",
        startIcon: <CloseOutlinedIcon />,
        handleAction: () => dispatch(hideDialogAction()),
      },
      {
        title: "Okay",
        variant: "contained",
        color: "primary",
        startIcon: <DoneOutlinedIcon />,
        handleAction: () => {
          if (selectedListItem === "")
            enqueueSnackbar("Select a worksheet", {
              persist: false,
              variant: "error",
            });
          else prepareSelectWorksheetRoute(selectedWorksheetName);
        },
      },
    ];

    return buttonsData.map((button, i) => (
      <Button
        key={i}
        variant={button.variant}
        color={button.color}
        onClick={button.handleAction}
        startIcon={button.startIcon}
      >
        {button.title}
      </Button>
    ));
  };

  const headers = getTableHeaders(selectedWorksheetData);

  return (
    <Dropzone
      accept="text/plain,text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      onDropAccepted={(acceptedFile) => {
        const file = acceptedFile[0];

        const reader = new FileReader();
        reader.readAsArrayBuffer(file);

        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          const fileData = new Uint8Array(reader.result as ArrayBuffer);
          const inputWorkbook = xlsx.read(fileData, { type: "array" });
          const { SheetNames, Sheets } = inputWorkbook;

          setInputDeckWorkbook(inputWorkbook);
          setWorksheetNames(SheetNames);

          if (SheetNames.length > 1) {
            const dialogParameters: DialogStuff = {
              name: "Excel_Worksheet_Selection_Dialog",
              title: "Excel Worksheet Selection",
              type: "selectWorksheetDialog",
              show: true,
              exclusive: true,
              maxWidth: "sm",
              iconType: "select",
              contentList: SheetNames,
              // workflowProcess: wp,
              // workflowCategory: wc,
              reducer: "forecastReducer",
            };
            dispatch(showDialogAction(dialogParameters));
          } else {
            const selectedWorksheetName = SheetNames && SheetNames[0];

            const selectedWorksheetDataXLSX = Sheets[selectedWorksheetName];
            const worksheetData = xlsx.utils.sheet_to_json<
              Record<string, React.Key>
            >(selectedWorksheetDataXLSX);
            setSelectedWorksheetName(selectedWorksheetName);
            setSelectedWorksheetData(worksheetData);
          }
        };
        reader.onprogress = () => {
          // console.log("Logged output -->: UploadFile -> e", e);
        };
      }}
      onDropRejected={(rejectedFile) => {
        enqueueSnackbar(`File format not supported! ${rejectedFile}`, {
          persist: false,
          variant: "error",
        });
      }}
      //   disabled={isDisabled}
      minSize={0}
      maxSize={10485760}
      multiple={false}
    >
      {({ getRootProps, getInputProps }) => {
        return (
          <Container
            className={classes.container}
            maxWidth="md"
            disableGutters
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <TreeView
              className={classes.rootTreeView}
              defaultExpanded={["1"]}
              defaultCollapseIcon={<MinusSquare />}
              defaultExpandIcon={<PlusSquare />}
              defaultEndIcon={<CloseSquare />}
            >
              <StyledTreeItem nodeId="1" label="Headers">
                {headers &&
                  headers.map((header, i) => {
                    const Id = "2";

                    return (
                      <StyledTreeItem key={i} nodeId={Id} label={header} />
                    );
                  })}
              </StyledTreeItem>
            </TreeView>
          </Container>
        );
      }}
    </Dropzone>
  );
}
