import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import isEqual from "react-fast-compare";
import { useSelector } from "react-redux";
import { Route, RouteComponentProps, useRouteMatch } from "react-router-dom";
import { createSelectorCreator, defaultMemoize } from "reselect";
import ModuleCard from "../../../Application/Components/Cards/ModuleCard";
import Image from "../../../Application/Components/Visuals/Image";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { ILandingData } from "../../../Application/Types/ApplicationTypes";
import ManageProfileForm from "../../Components/Forms/ManageProfileForm";
import ManageProfile from "../../Images/ManageProfile.svg";
import SingleRegistration from "../../Images/SingleRegistration.svg";
import { loadAdminWorkflowAction } from "../../Redux/Actions/AdminActions";
import RegisterRoute from "../Register/RegisterRoute";
import { IdType } from "./AdministrationLandingTypes";

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
          alt="User logo"
        />
      ),
      route: `${url}/userRegistration`,
      workflowProcess: "userRegistration",
      workflowCategory: "inputDataWorkflows",
    },
    {
      name: "Manage Profile",
      description: `Manage profiles`,
      icon: (
        <Image
          className={classes.image}
          src={ManageProfile}
          alt="Manage Profile logo"
        />
      ),
      route: `${url}/manageProfile`,
      workflowProcess: "manageProfile",
      workflowCategory: "inputDataWorkflows",
    },
  ] as ILandingData[];

  return (
    <>
      {loadAdminWorkflow ? (
        <div className={classes.adminWorkflow}>
          <Route exact path={`${path}/:dataInputId`}>
            {(props: RouteComponentProps<IdType>) => {
              const { match } = props;
              const {
                params: { dataInputId },
              } = match;

              const administrationDeckWorkflows = {
                userRegistration: <RegisterRoute />,
                manageProfile: <ManageProfileForm />,
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
                moduleAction={() =>
                  loadAdminWorkflowAction("loadAdminWorkflow", true)
                }
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
