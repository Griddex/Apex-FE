import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { useSelector } from "react-redux";
import { Route, RouteComponentProps, useRouteMatch } from "react-router-dom";
import ModuleCard from "../../../Application/Components/Cards/ModuleCard";
import Image from "../../../Application/Components/Visuals/Image";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { ILandingData } from "../../../Application/Types/ApplicationTypes";
import SingleRegistration from "../../Images/SingleRegistration.svg";
import { loadAdminWorkflowAction } from "../../Redux/Actions/AdminActions";
import RegisterRoute from "../Register/RegisterRoute";
import { IdType } from "./AdministrationLandingTypes";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const useStyles = makeStyles((theme) => ({
  administrationDeckLanding: {
    display: "flex",
    width: "100%",
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
  adminWorkflow: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: { height: 70, width: 70 },
}));

const loadAdminWorkflowSelector = createDeepEqualSelector(
  (state: RootState) => state.adminReducer.loadAdminWorkflow,
  (loadAdminWorkflow) => loadAdminWorkflow
);

const AdministrationLanding = () => {
  const classes = useStyles();
  const { url, path } = useRouteMatch();

  const loadAdminWorkflow = useSelector(loadAdminWorkflowSelector);

  const administrationLandingData = [
    {
      name: "Registration",
      description: `Register users`,
      icon: (
        <Image
          className={classes.image}
          src={SingleRegistration}
          alt="Excel logo"
        />
      ),
      route: `${url}/userRegistration`,
      workflowProcess: "userRegistration",
      workflowCategory: "inputDataWorkflows",
    },
  ] as ILandingData[];

  return (
    <>
      {loadAdminWorkflow ? (
        <div className={classes.adminWorkflow}>
          <Route exact path={`${path}/:dataInputId`}>
            {(props: RouteComponentProps<IdType>) => {
              console.log(
                "Logged output --> ~ file: AdministrationLanding.tsx ~ line 68 ~ AdministrationLanding ~ props",
                props
              );
              const { match } = props;
              const {
                params: { dataInputId },
              } = match;

              const administrationDeckWorkflows = {
                userRegistration: <RegisterRoute />,
              };

              return administrationDeckWorkflows[dataInputId];
            }}
          </Route>
        </div>
      ) : (
        <div className={classes.administrationDeckLanding}>
          {administrationLandingData.map((module) => {
            const {
              icon,
              name,
              description,
              route,
              workflowProcess,
              workflowCategory,
            } = module;

            return (
              <ModuleCard
                key={name}
                isDispatched={true}
                moduleAction={loadAdminWorkflowAction}
                title={name}
                description={description}
                icon={icon}
                route={route}
                wP={workflowProcess}
                wC={workflowCategory}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default AdministrationLanding;
