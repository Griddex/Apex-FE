import { Checkbox, FormControlLabel, useTheme } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import SvgIcon from "@material-ui/core/SvgIcon";
import TreeItem, { TreeItemProps } from "@material-ui/lab/TreeItem";
import TreeView from "@material-ui/lab/TreeView";
import React from "react";
import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { animated, useSpring } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import ItemTypes from "../Utils/DragAndDropItemTypes";
import { RenderTree } from "./ForecastTreeViewTypes";

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
    height: "100%",
    width: "100%",
    flexGrow: 1,
    overflow: "auto",
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
    overflow: "overlay",
    border: "1px solid #F7F7F7",
  },
}));

export default function ForecastTreeView() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  // const { forecastTree } = useSelector(
  //   (state: RootState) => state.forecastReducer
  // );

  const forecastTree = [
    {
      id: "6021dd718f358e2184ba1d90",
      name: "1P1C",
      children: [
        {
          id: "6021dd718f358e2184ba1d91",
          name: "GBARAN3_GP",
          children: [],
        },
        {
          id: "6021dd718f358e2184ba1d92",
          name: "GBARAN2_FS",
          children: [],
        },
        {
          id: "6021dd718f358e2184ba1d93",
          name: "SOKU4_GP",
          children: [],
        },
        {
          id: "6021dd718f358e2184ba1d94",
          name: "ADIBAWA1_FS",
          children: [
            {
              id: "6021dd718f358e2184ba1d95",
              name: "C01_D9000W_ADIB027",
            },
            {
              id: "6021dd718f358e2184ba1df6",
              name: "R03_D9000W_ADIB004S",
            },
            {
              id: "6021dd718f358e2184ba1e57",
              name: "N02_D8000X_ADIB010S",
            },
            {
              id: "6021dd718f358e2184ba1eb8",
              name: "N02_D8000X_ADIB012T",
            },
            {
              id: "6021dd718f358e2184ba1f19",
              name: "N02_D8000X_ADIB016T",
            },
            {
              id: "6021dd718f358e2184ba1f7a",
              name: "N02_D8000X_ADIB025S",
            },
            {
              id: "6021dd728f358e2184ba1fdb",
              name: "N02_D9000E_ADIB008S",
            },
            {
              id: "6021dd728f358e2184ba203c",
              name: "N02_D9000E_ADIB025L",
            },
            {
              id: "6021dd728f358e2184ba209d",
              name: "N02_D9000W_ADIB023S",
            },
            {
              id: "6021dd728f358e2184ba20fe",
              name: "N02_G2000W_ADIB023L",
            },
            {
              id: "6021dd728f358e2184ba215f",
              name: "N02_G2000W_ADIB024L",
            },
            {
              id: "6021dd728f358e2184ba21c0",
              name: "R07_D4200M_ADNE004S",
            },
            {
              id: "6021dd728f358e2184ba2221",
              name: "N02_D4200M_ADNE002S",
            },
            {
              id: "6021dd728f358e2184ba2282",
              name: "N02_D6200M_ADNE001L",
            },
            {
              id: "6021dd728f358e2184ba22e3",
              name: "N02_D6200M_ADNE002L",
            },
            {
              id: "6021dd728f358e2184ba2344",
              name: "N02_D6200M_ADNE004L",
            },
          ],
        },
        {
          id: "6021dd728f358e2184ba23a5",
          name: "OKOLOMA1_FS",
          children: [
            {
              id: "6021dd728f358e2184ba23a6",
              name: "D01_F5000A_AFAM025T",
            },
            {
              id: "6021dd738f358e2184ba2407",
              name: "D01_F5000A_AFAM027T",
            },
          ],
        },
        {
          id: "6021dd738f358e2184ba2468",
          name: "OKOLOMA1_GP",
          children: [
            {
              id: "6021dd738f358e2184ba2469",
              name: "G02_F5000A_AFAM026T",
            },
          ],
        },
        {
          id: "6021dd738f358e2184ba24ca",
          name: "OKOLOMA2_GP",
          children: [],
        },
        {
          id: "6021dd738f358e2184ba24cb",
          name: "AGBADA1_FS",
          children: [
            {
              id: "6021dd738f358e2184ba24cc",
              name: "C01_S2000M_AGBD025S",
            },
            {
              id: "6021dd738f358e2184ba252d",
              name: "C01_S3000L_AGBD032S",
            },
            {
              id: "6021dd738f358e2184ba258e",
              name: "C02_E8000C_AGBD008T",
            },
            {
              id: "6021dd738f358e2184ba25ef",
              name: "C02_E8000C_AGBD016T",
            },
            {
              id: "6021dd738f358e2184ba2650",
              name: "N01_D5200X_AGBD018S",
            },
            {
              id: "6021dd738f358e2184ba26b1",
              name: "N01_D7000X_AGBD018L",
            },
            {
              id: "6021dd738f358e2184ba2712",
              name: "N01_E8000C_AGBD008T",
            },
            {
              id: "6021dd738f358e2184ba2773",
              name: "N01_E8000C_AGBD016T",
            },
            {
              id: "6021dd748f358e2184ba27d4",
              name: "N01_S2000K_AGBD033L",
            },
            {
              id: "6021dd748f358e2184ba2835",
              name: "D03_E2000H_AGBDAGHAE1E2W04",
            },
            {
              id: "6021dd748f358e2184ba2896",
              name: "D03_E8000H_AGBDAGHAE8E9W12",
            },
          ],
        },
        {
          id: "6021dd748f358e2184ba28f7",
          name: "AGBADA2_FS",
          children: [
            {
              id: "6021dd748f358e2184ba28f8",
              name: "R01_D4000X_AGBD057T",
            },
            {
              id: "6021dd748f358e2184ba2959",
              name: "R07_D5200X_AGBD056S",
            },
            {
              id: "6021dd748f358e2184ba29ba",
              name: "R07_D6000E_AGBD056L",
            },
            {
              id: "6021dd748f358e2184ba2a1b",
              name: "R07_E1000H_AGBD066S",
            },
            {
              id: "6021dd758f358e2184ba2a7c",
              name: "R07_M2000N_AGBD039L",
            },
            {
              id: "6021dd758f358e2184ba2add",
              name: "N01_D2000X_AGBD044S",
            },
            {
              id: "6021dd758f358e2184ba2b3e",
              name: "N01_D3000X_AGBD030S",
            },
            {
              id: "6021dd758f358e2184ba2b9f",
              name: "N01_D4000X_AGBD030L",
            },
            {
              id: "6021dd758f358e2184ba2c00",
              name: "N01_D4000X_AGBD041L",
            },
            {
              id: "6021dd758f358e2184ba2c61",
              name: "N01_D4000X_AGBD044L",
            },
            {
              id: "6021dd758f358e2184ba2cc2",
              name: "N01_D4000X_AGBD051S",
            },
            {
              id: "6021dd758f358e2184ba2d23",
              name: "N01_D4000X_AGBD052S",
            },
            {
              id: "6021dd758f358e2184ba2d84",
              name: "N01_D5000E_AGBD029T",
            },
            {
              id: "6021dd758f358e2184ba2de5",
              name: "N01_D5200X_AGBD042S",
            },
            {
              id: "6021dd758f358e2184ba2e46",
              name: "N01_D5200X_AGBD048S",
            },
            {
              id: "6021dd768f358e2184ba2ea7",
              name: "N01_D5200X_AGBD050S",
            },
            {
              id: "6021dd768f358e2184ba2f08",
              name: "N01_D5200X_AGBD051L",
            },
            {
              id: "6021dd768f358e2184ba2f69",
              name: "N01_D5200X_AGBD054S",
            },
            {
              id: "6021dd768f358e2184ba2fca",
              name: "N01_D6000S_AGBD035T",
            },
            {
              id: "6021dd768f358e2184ba302b",
              name: "N01_D7000X_AGBD002T",
            },
            {
              id: "6021dd768f358e2184ba308c",
              name: "N01_D7000X_AGBD024L",
            },
            {
              id: "6021dd768f358e2184ba30ed",
              name: "N01_D7000X_AGBD034S",
            },
            {
              id: "6021dd768f358e2184ba314e",
              name: "N01_D7000X_AGBD040L",
            },
            {
              id: "6021dd778f358e2184ba31af",
              name: "N01_D7000X_AGBD059L",
            },
            {
              id: "6021dd778f358e2184ba3210",
              name: "N01_D7000X_AGBD061L",
            },
            {
              id: "6021dd778f358e2184ba3271",
              name: "N01_D8000S_AGBD047L",
            },
            {
              id: "6021dd778f358e2184ba32d2",
              name: "N01_D8000X_AGBD043L",
            },
            {
              id: "6021dd778f358e2184ba3333",
              name: "N01_D8000X_AGBD063T",
            },
            {
              id: "6021dd778f358e2184ba3394",
              name: "N01_D8000X_AGBD065T",
            },
            {
              id: "6021dd778f358e2184ba33f5",
              name: "N01_D8500S_AGBD058S",
            },
            {
              id: "6021dd778f358e2184ba3456",
              name: "N01_E4000S_AGBD058L",
            },
          ],
        },
      ],
    },
    {
      id: "6021df46ced1503aa09eb8d4",
      name: "2P2C",
      children: [
        {
          id: "6021df46ced1503aa09eb8d5",
          name: "GBARAN3_GP",
          children: [],
        },
        {
          id: "6021df46ced1503aa09eb8d6",
          name: "GBARAN2_FS",
          children: [],
        },
        {
          id: "6021df46ced1503aa09eb8d7",
          name: "SOKU4_GP",
          children: [],
        },
        {
          id: "6021df46ced1503aa09eb8d8",
          name: "ADIBAWA1_FS",
          children: [
            {
              id: "6021df46ced1503aa09eb8d9",
              name: "C01_D9000W_ADIB027",
            },
            {
              id: "6021df46ced1503aa09eb93a",
              name: "R03_D9000W_ADIB004S",
            },
            {
              id: "6021df46ced1503aa09eb99b",
              name: "N02_D8000X_ADIB010S",
            },
            {
              id: "6021df46ced1503aa09eb9fc",
              name: "N02_D8000X_ADIB012T",
            },
            {
              id: "6021df46ced1503aa09eba5d",
              name: "N02_D8000X_ADIB016T",
            },
            {
              id: "6021df46ced1503aa09ebabe",
              name: "N02_D8000X_ADIB025S",
            },
            {
              id: "6021df46ced1503aa09ebb1f",
              name: "N02_D9000E_ADIB008S",
            },
            {
              id: "6021df46ced1503aa09ebb80",
              name: "N02_D9000E_ADIB025L",
            },
            {
              id: "6021df47ced1503aa09ebbe1",
              name: "N02_D9000W_ADIB023S",
            },
            {
              id: "6021df47ced1503aa09ebc42",
              name: "N02_G2000W_ADIB023L",
            },
            {
              id: "6021df47ced1503aa09ebca3",
              name: "N02_G2000W_ADIB024L",
            },
            {
              id: "6021df47ced1503aa09ebd04",
              name: "R07_D4200M_ADNE004S",
            },
            {
              id: "6021df47ced1503aa09ebd65",
              name: "N02_D4200M_ADNE002S",
            },
            {
              id: "6021df47ced1503aa09ebdc6",
              name: "N02_D6200M_ADNE001L",
            },
            {
              id: "6021df47ced1503aa09ebe27",
              name: "N02_D6200M_ADNE002L",
            },
            {
              id: "6021df47ced1503aa09ebe88",
              name: "N02_D6200M_ADNE004L",
            },
          ],
        },
        {
          id: "6021df47ced1503aa09ebee9",
          name: "OKOLOMA1_FS",
          children: [
            {
              id: "6021df47ced1503aa09ebeea",
              name: "D01_F5000A_AFAM025T",
            },
            {
              id: "6021df47ced1503aa09ebf4b",
              name: "D01_F5000A_AFAM027T",
            },
          ],
        },
        {
          id: "6021df47ced1503aa09ebfac",
          name: "OKOLOMA1_GP",
          children: [
            {
              id: "6021df47ced1503aa09ebfad",
              name: "G02_F5000A_AFAM026T",
            },
          ],
        },
        {
          id: "6021df47ced1503aa09ec00e",
          name: "OKOLOMA2_GP",
          children: [],
        },
        {
          id: "6021df47ced1503aa09ec00f",
          name: "AGBADA1_FS",
          children: [
            {
              id: "6021df47ced1503aa09ec010",
              name: "C01_S2000M_AGBD025S",
            },
            {
              id: "6021df48ced1503aa09ec071",
              name: "C01_S3000L_AGBD032S",
            },
            {
              id: "6021df48ced1503aa09ec0d2",
              name: "C02_E8000C_AGBD008T",
            },
            {
              id: "6021df48ced1503aa09ec133",
              name: "C02_E8000C_AGBD016T",
            },
            {
              id: "6021df48ced1503aa09ec194",
              name: "N01_D5200X_AGBD018S",
            },
            {
              id: "6021df48ced1503aa09ec1f5",
              name: "N01_D7000X_AGBD018L",
            },
            {
              id: "6021df48ced1503aa09ec256",
              name: "N01_E8000C_AGBD008T",
            },
            {
              id: "6021df48ced1503aa09ec2b7",
              name: "N01_E8000C_AGBD016T",
            },
            {
              id: "6021df48ced1503aa09ec318",
              name: "N01_S2000K_AGBD033L",
            },
            {
              id: "6021df48ced1503aa09ec379",
              name: "D03_E2000H_AGBDAGHAE1E2W04",
            },
            {
              id: "6021df48ced1503aa09ec3da",
              name: "D03_E8000H_AGBDAGHAE8E9W12",
            },
          ],
        },
        {
          id: "6021df48ced1503aa09ec43b",
          name: "AGBADA2_FS",
          children: [
            {
              id: "6021df48ced1503aa09ec43c",
              name: "R01_D4000X_AGBD057T",
            },
            {
              id: "6021df48ced1503aa09ec49d",
              name: "R07_D5200X_AGBD056S",
            },
            {
              id: "6021df48ced1503aa09ec4fe",
              name: "R07_D6000E_AGBD056L",
            },
            {
              id: "6021df49ced1503aa09ec55f",
              name: "R07_E1000H_AGBD066S",
            },
            {
              id: "6021df49ced1503aa09ec5c0",
              name: "R07_M2000N_AGBD039L",
            },
            {
              id: "6021df49ced1503aa09ec621",
              name: "N01_D2000X_AGBD044S",
            },
            {
              id: "6021df49ced1503aa09ec682",
              name: "N01_D3000X_AGBD030S",
            },
            {
              id: "6021df49ced1503aa09ec6e3",
              name: "N01_D4000X_AGBD030L",
            },
            {
              id: "6021df49ced1503aa09ec744",
              name: "N01_D4000X_AGBD041L",
            },
            {
              id: "6021df49ced1503aa09ec7a5",
              name: "N01_D4000X_AGBD044L",
            },
            {
              id: "6021df49ced1503aa09ec806",
              name: "N01_D4000X_AGBD051S",
            },
            {
              id: "6021df49ced1503aa09ec867",
              name: "N01_D4000X_AGBD052S",
            },
            {
              id: "6021df49ced1503aa09ec8c8",
              name: "N01_D5000E_AGBD029T",
            },
            {
              id: "6021df49ced1503aa09ec929",
              name: "N01_D5200X_AGBD042S",
            },
            {
              id: "6021df49ced1503aa09ec98a",
              name: "N01_D5200X_AGBD048S",
            },
            {
              id: "6021df4aced1503aa09ec9eb",
              name: "N01_D5200X_AGBD050S",
            },
            {
              id: "6021df4aced1503aa09eca4c",
              name: "N01_D5200X_AGBD051L",
            },
            {
              id: "6021df4aced1503aa09ecaad",
              name: "N01_D5200X_AGBD054S",
            },
            {
              id: "6021df4aced1503aa09ecb0e",
              name: "N01_D6000S_AGBD035T",
            },
            {
              id: "6021df4aced1503aa09ecb6f",
              name: "N01_D7000X_AGBD002T",
            },
            {
              id: "6021df4aced1503aa09ecbd0",
              name: "N01_D7000X_AGBD024L",
            },
            {
              id: "6021df4aced1503aa09ecc31",
              name: "N01_D7000X_AGBD034S",
            },
            {
              id: "6021df4aced1503aa09ecc92",
              name: "N01_D7000X_AGBD040L",
            },
            {
              id: "6021df4aced1503aa09eccf3",
              name: "N01_D7000X_AGBD059L",
            },
            {
              id: "6021df4aced1503aa09ecd54",
              name: "N01_D7000X_AGBD061L",
            },
            {
              id: "6021df4aced1503aa09ecdb5",
              name: "N01_D8000S_AGBD047L",
            },
            {
              id: "6021df4aced1503aa09ece16",
              name: "N01_D8000X_AGBD043L",
            },
            {
              id: "6021df4aced1503aa09ece77",
              name: "N01_D8000X_AGBD063T",
            },
            {
              id: "6021df4bced1503aa09eced8",
              name: "N01_D8000X_AGBD065T",
            },
            {
              id: "6021df4bced1503aa09ecf39",
              name: "N01_D8500S_AGBD058S",
            },
            {
              id: "6021df4bced1503aa09ecf9a",
              name: "N01_E4000S_AGBD058L",
            },
          ],
        },
      ],
    },
    {
      id: "6021dd778f358e2184ba34b7",
      name: "3P3C",
      children: [
        {
          id: "6021dd778f358e2184ba34b8",
          name: "GBARAN3_GP",
          children: [],
        },
        {
          id: "6021dd778f358e2184ba34b9",
          name: "GBARAN2_FS",
          children: [],
        },
        {
          id: "6021dd778f358e2184ba34ba",
          name: "SOKU4_GP",
          children: [],
        },
        {
          id: "6021dd778f358e2184ba34bb",
          name: "ADIBAWA1_FS",
          children: [
            {
              id: "6021dd778f358e2184ba34bc",
              name: "C01_D9000W_ADIB027",
            },
            {
              id: "6021dd778f358e2184ba351d",
              name: "R03_D9000W_ADIB004S",
            },
            {
              id: "6021dd788f358e2184ba357e",
              name: "N02_D8000X_ADIB010S",
            },
            {
              id: "6021dd788f358e2184ba35df",
              name: "N02_D8000X_ADIB012T",
            },
            {
              id: "6021dd788f358e2184ba3640",
              name: "N02_D8000X_ADIB016T",
            },
            {
              id: "6021dd788f358e2184ba36a1",
              name: "N02_D8000X_ADIB025S",
            },
            {
              id: "6021dd788f358e2184ba3702",
              name: "N02_D9000E_ADIB008S",
            },
            {
              id: "6021dd788f358e2184ba3763",
              name: "N02_D9000E_ADIB025L",
            },
            {
              id: "6021dd788f358e2184ba37c4",
              name: "N02_D9000W_ADIB023S",
            },
            {
              id: "6021dd788f358e2184ba3825",
              name: "N02_G2000W_ADIB023L",
            },
            {
              id: "6021dd788f358e2184ba3886",
              name: "N02_G2000W_ADIB024L",
            },
            {
              id: "6021dd788f358e2184ba38e7",
              name: "R07_D4200M_ADNE004S",
            },
            {
              id: "6021dd788f358e2184ba3948",
              name: "N02_D4200M_ADNE002S",
            },
            {
              id: "6021dd788f358e2184ba39a9",
              name: "N02_D6200M_ADNE001L",
            },
            {
              id: "6021dd798f358e2184ba3a0a",
              name: "N02_D6200M_ADNE002L",
            },
            {
              id: "6021dd798f358e2184ba3a6b",
              name: "N02_D6200M_ADNE004L",
            },
          ],
        },
        {
          id: "6021dd798f358e2184ba3acc",
          name: "OKOLOMA1_FS",
          children: [
            {
              id: "6021dd798f358e2184ba3acd",
              name: "D01_F5000A_AFAM025T",
            },
            {
              id: "6021dd798f358e2184ba3b2e",
              name: "D01_F5000A_AFAM027T",
            },
          ],
        },
        {
          id: "6021dd798f358e2184ba3b8f",
          name: "OKOLOMA1_GP",
          children: [
            {
              id: "6021dd798f358e2184ba3b90",
              name: "G02_F5000A_AFAM026T",
            },
          ],
        },
        {
          id: "6021dd798f358e2184ba3bf1",
          name: "OKOLOMA2_GP",
          children: [],
        },
        {
          id: "6021dd798f358e2184ba3bf2",
          name: "AGBADA1_FS",
          children: [
            {
              id: "6021dd798f358e2184ba3bf3",
              name: "C01_S2000M_AGBD025S",
            },
            {
              id: "6021dd798f358e2184ba3c54",
              name: "C01_S3000L_AGBD032S",
            },
            {
              id: "6021dd798f358e2184ba3cb5",
              name: "C02_E8000C_AGBD008T",
            },
            {
              id: "6021dd798f358e2184ba3d16",
              name: "C02_E8000C_AGBD016T",
            },
            {
              id: "6021dd798f358e2184ba3d77",
              name: "N01_D5200X_AGBD018S",
            },
            {
              id: "6021dd798f358e2184ba3dd8",
              name: "N01_D7000X_AGBD018L",
            },
            {
              id: "6021dd7a8f358e2184ba3e39",
              name: "N01_E8000C_AGBD008T",
            },
            {
              id: "6021dd7a8f358e2184ba3e9a",
              name: "N01_E8000C_AGBD016T",
            },
            {
              id: "6021dd7a8f358e2184ba3efb",
              name: "N01_S2000K_AGBD033L",
            },
            {
              id: "6021dd7a8f358e2184ba3f5c",
              name: "D03_E2000H_AGBDAGHAE1E2W04",
            },
            {
              id: "6021dd7a8f358e2184ba3fbd",
              name: "D03_E8000H_AGBDAGHAE8E9W12",
            },
          ],
        },
        {
          id: "6021dd7a8f358e2184ba401e",
          name: "AGBADA2_FS",
          children: [
            {
              id: "6021dd7a8f358e2184ba401f",
              name: "R01_D4000X_AGBD057T",
            },
            {
              id: "6021dd7a8f358e2184ba4080",
              name: "R07_D5200X_AGBD056S",
            },
            {
              id: "6021dd7a8f358e2184ba40e1",
              name: "R07_D6000E_AGBD056L",
            },
            {
              id: "6021dd7a8f358e2184ba4142",
              name: "R07_E1000H_AGBD066S",
            },
            {
              id: "6021dd7a8f358e2184ba41a3",
              name: "R07_M2000N_AGBD039L",
            },
            {
              id: "6021dd7a8f358e2184ba4204",
              name: "N01_D2000X_AGBD044S",
            },
            {
              id: "6021dd7b8f358e2184ba4265",
              name: "N01_D3000X_AGBD030S",
            },
            {
              id: "6021dd7b8f358e2184ba42c6",
              name: "N01_D4000X_AGBD030L",
            },
            {
              id: "6021dd7b8f358e2184ba4327",
              name: "N01_D4000X_AGBD041L",
            },
            {
              id: "6021dd7b8f358e2184ba4388",
              name: "N01_D4000X_AGBD044L",
            },
            {
              id: "6021dd7b8f358e2184ba43e9",
              name: "N01_D4000X_AGBD051S",
            },
            {
              id: "6021dd7b8f358e2184ba444a",
              name: "N01_D4000X_AGBD052S",
            },
            {
              id: "6021dd7b8f358e2184ba44ab",
              name: "N01_D5000E_AGBD029T",
            },
            {
              id: "6021dd7b8f358e2184ba450c",
              name: "N01_D5200X_AGBD042S",
            },
            {
              id: "6021dd7b8f358e2184ba456d",
              name: "N01_D5200X_AGBD048S",
            },
            {
              id: "6021dd7b8f358e2184ba45ce",
              name: "N01_D5200X_AGBD050S",
            },
            {
              id: "6021dd7c8f358e2184ba462f",
              name: "N01_D5200X_AGBD051L",
            },
            {
              id: "6021dd7c8f358e2184ba4690",
              name: "N01_D5200X_AGBD054S",
            },
            {
              id: "6021dd7c8f358e2184ba46f1",
              name: "N01_D6000S_AGBD035T",
            },
            {
              id: "6021dd7c8f358e2184ba4752",
              name: "N01_D7000X_AGBD002T",
            },
            {
              id: "6021dd7c8f358e2184ba47b3",
              name: "N01_D7000X_AGBD024L",
            },
            {
              id: "6021dd7c8f358e2184ba4814",
              name: "N01_D7000X_AGBD034S",
            },
            {
              id: "6021dd7c8f358e2184ba4875",
              name: "N01_D7000X_AGBD040L",
            },
            {
              id: "6021dd7c8f358e2184ba48d6",
              name: "N01_D7000X_AGBD059L",
            },
            {
              id: "6021dd7c8f358e2184ba4937",
              name: "N01_D7000X_AGBD061L",
            },
            {
              id: "6021dd7d8f358e2184ba4998",
              name: "N01_D8000S_AGBD047L",
            },
            {
              id: "6021dd7d8f358e2184ba49f9",
              name: "N01_D8000X_AGBD043L",
            },
            {
              id: "6021dd7d8f358e2184ba4a5a",
              name: "N01_D8000X_AGBD063T",
            },
            {
              id: "6021dd7d8f358e2184ba4abb",
              name: "N01_D8000X_AGBD065T",
            },
            {
              id: "6021dd7e8f358e2184ba4b1c",
              name: "N01_D8500S_AGBD058S",
            },
            {
              id: "6021dd7e8f358e2184ba4b7d",
              name: "N01_E4000S_AGBD058L",
            },
          ],
        },
      ],
    },
  ];

  const [selected, setSelected] = React.useState<string[]>([]);
  const initExpanded = forecastTree.map((data) => data.id);

  function getChildById(node: RenderTree, id: string) {
    let array: string[] = [];

    function getAllChildren(nodes: RenderTree | null) {
      if (nodes === null) return [];
      array.push(nodes.id);
      if (Array.isArray(nodes.children)) {
        nodes.children.forEach((node) => {
          array = [...array, ...getAllChildren(node)];
          array = array.filter((v, i) => array.indexOf(v) === i);
        });
      }
      return array;
    }

    function getNodeById(nodes: RenderTree, id: string) {
      if (nodes.id === id) {
        return nodes;
      } else if (Array.isArray(nodes.children)) {
        let result = null;
        nodes.children.forEach((node) => {
          if (getNodeById(node, id)) {
            result = getNodeById(node, id);
          }
        });
        return result;
      }

      return null;
    }

    return getAllChildren(getNodeById(node, id));
  }

  function getOnChange(index: number, checked: boolean, nodes: RenderTree) {
    const allNodes: string[] = getChildById(forecastTree[index], nodes.id);
    let array = checked
      ? [...selected, ...allNodes]
      : selected.filter((value) => !allNodes.includes(value));

    array = array.filter((v, i) => array.indexOf(v) === i);

    setSelected(array);
  }

  const renderTree = (index: number, nodes: RenderTree) => (
    <StyledTreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={
        <FormControlLabel
          control={
            <Checkbox
              checked={selected.some((item) => item === nodes.id)}
              onChange={(event) =>
                getOnChange(index, event.currentTarget.checked, nodes)
              }
              onClick={(e) => e.stopPropagation()}
            />
          }
          label={<>{nodes.name}</>}
          key={nodes.id}
        />
      }
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node, index) => renderTree(index, node))
        : null}
    </StyledTreeItem>
  );

  return (
    <TreeView
      className={classes.rootTreeView}
      // defaultExpanded={initExpanded}
      defaultCollapseIcon={<MinusSquare />}
      defaultExpandIcon={<PlusSquare />}
      // defaultEndIcon={<CloseSquare />}
    >
      {forecastTree.map((data, index) => renderTree(index, data))}
    </TreeView>
  );
}
