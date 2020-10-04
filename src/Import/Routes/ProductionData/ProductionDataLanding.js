import { makeStyles, useTheme } from "@material-ui/core/styles";
import React from "react";
import { useSelector } from "react-redux";
import { Route, useRouteMatch } from "react-router-dom";
import Image from "../../../Application/Components/Visuals/Image";
import { loadWorkflowAction } from "../../../Application/Redux/Actions/LayoutActions";
import ExistingDeck from "../../Images/ExistingDeck.svg";
import ImportDatabase from "../../Images/ImportDatabase.svg";
import MSExcel from "../../Images/MSExcel.svg";
import ModuleCard from "./../../../Application/Components/Cards/ModuleCard";
import DatabaseExcelWorkflow from "./../Common/InputWorkflows/DatabaseExcelWorkflow";
import ExistingDataWorkflow from "./../Common/InputWorkflows/ExistingDataWorkflow";
import AvatarStack from "react-avatar-stack";

const useStyles = makeStyles((theme) => ({
  ProductionDataLanding: {
    display: "flex",
    flexGrow: 1,
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    "& > *": {
      margin: theme.spacing(3),
      height: 370,
      width: 240,
    },
  },
  ImportWorkflow: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: { height: 70, width: 70 },
}));

const ProductionDataLanding = ({ subModule: { name } }) => {
  const classes = useStyles();
  const theme = useTheme();

  const { url, path } = useRouteMatch();
  const loadWorkflow = useSelector((state) => state.layoutReducer.loadWorkflow);
  const nameLowCase = name.toLowerCase();

  const productionLandingData = [
    {
      name: "Database + Excel",
      description: `Utilize ${nameLowCase} by connecting to local, remote databases or Microsoft Excel. Providers supported: AccessDb, MSSQL, MySQL etc`,
      icon: (
        <AvatarStack
          nextOverlapPrevious={true}
          maxAvatarNumber={3}
          numberLeftBackgroundColor={theme.palette.primary.main}
          numberLeftColor={"white"}
        >
          <Image
            className={classes.image}
            src={ImportDatabase}
            alt="Hydrocarbon Forecasting Platform Company Logo"
          />
          <Image
            className={classes.image}
            src={MSExcel}
            alt="Hydrocarbon Forecasting Platform Company Logo"
          />
        </AvatarStack>
      ),
      route: `${url}/productiondatasource`,
    },
    {
      name: `Approved ${name}`,
      description: `Select pre-exisiting and approved ${nameLowCase} from your database`,
      icon: (
        <Image
          className={classes.image}
          src={ExistingDeck}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/approvedproductiondata`,
    },
  ];

  return (
    <>
      {loadWorkflow ? (
        <div className={classes.ImportWorkflow}>
          <Route
            exact
            path={`${path}/:dataType`}
            render={(props) => {
              const { match } = props;
              const {
                params: { dataType },
              } = match;

              const inputProductionDataWorkflows = {
                productiondatasource: <DatabaseExcelWorkflow />,
                approvedproductiondata: <ExistingDataWorkflow />,
              };

              return inputProductionDataWorkflows[dataType];
            }}
          />
        </div>
      ) : (
        <div className={classes.ProductionDataLanding}>
          {productionLandingData.map((module) => {
            const { icon, name, description, route } = module;
            return (
              <ModuleCard
                key={name}
                moduleAction={loadWorkflowAction}
                name={name}
                description={description}
                Icon={icon}
                route={route}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default ProductionDataLanding;
