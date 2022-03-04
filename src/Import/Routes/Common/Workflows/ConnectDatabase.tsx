import AddLinkOutlinedIcon from "@mui/icons-material/AddLinkOutlined";
import EditIcon from "@mui/icons-material/Edit";
import LinkIcon from "@mui/icons-material/Link";
import LockIcon from "@mui/icons-material/Lock";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import PersonIcon from "@mui/icons-material/Person";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button, Input, useTheme } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import makeStyles from "@mui/styles/makeStyles";
import { Form, Formik, FormikProps } from "formik";
import omit from "lodash.omit";
import React from "react";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import { OnChangeValue } from "react-select";
import { createSelectorCreator, defaultMemoize } from "reselect";
import * as Yup from "yup";
import { IUserState } from "../../../../Administration/Redux/State/UserStateTypes";
import BaseButtons from "../../../../Application/Components/BaseButtons/BaseButtons";
import AnalyticsComp from "../../../../Application/Components/Basic/AnalyticsComp";
import ApexSelectRS from "../../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../../Application/Components/Selects/SelectItemsType";
import ApexFlexContainer from "../../../../Application/Components/Styles/ApexFlexContainer";
import { IAllWorkflows } from "../../../../Application/Components/Workflows/WorkflowTypes";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import { getApexIconButtonStyle } from "../../../../Application/Styles/IconButtonStyles";
import { IConnectDatabase } from "../../../../Application/Types/ApplicationTypes";
import {
  dataProviderOptions,
  serverAuthOptions,
} from "../../../ImportData/ImportData";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    border: `1px solid ${theme.palette.grey["200"]}`,
    backgroundColor: "#FFF",
    padding: 20,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "45%",
  },
  formTextFields: {
    "& > *": { marginTop: 40, "& .MuiInputBase-root": { height: 44 } },
  },
  topSection: {
    height: "40%",
    borderBottom: `1px solid ${theme.palette.grey["200"]}`,
  },
  bottomSection: {
    height: "100%",
    width: "100%",
    paddingTop: 20,
  },
  connect: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "auto",
  },
  button: {
    color: theme.palette.primary.main,
    border: `1.5px solid ${theme.palette.primary.main}`,
    fontWeight: "bold",
  },
  connectButton: {
    color: theme.palette.primary.main,
    border: `1.5px solid ${theme.palette.primary.main}`,
    fontWeight: "bold",
    width: 184,
  },
  checkBox: { margin: 0 },
  selectItem: {},
}));

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const serverNameOptionsSelector = createDeepEqualSelector(
  (state: RootState) => state.inputReducer.serverNameOptions,
  (id) => id
);

export interface IDatabaseConfig {
  title: string;
  selectedServerName: string;
  userName: string;
  password: string;
  filePath: string;
  connectionString: string;
}

const ConnectDatabase = ({
  reducer,
  wrkflwCtgry,
  wrkflwPrcss,
  finalAction,
}: IConnectDatabase) => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const wc = "inputDataWorkflows";

  const serverNameOptions: ISelectOption[] = useSelector(
    serverNameOptionsSelector
  );
  const [dataProviderOption, setDataProviderOption] = React.useState(
    (dataProviderOptions as ISelectOption[])[0]
  );
  const [serverAuthOption, setServerAuthOption] = React.useState(
    (serverAuthOptions as ISelectOption[])[0]
  );
  const [serverNameOption, setServerNameOption] = React.useState(
    serverNameOptions[0]
  );
  const [showPassword, setShowPassword] = React.useState(false);

  const initialDatabaseConfig = {
    title: "",
    selectedServerName: "",
    userName: "",
    password: "",
    filePath: "",
    connectionString: "",
  } as IDatabaseConfig;

  const [databaseConfig, setDatabaseConfig] = React.useState(
    initialDatabaseConfig
  );

  React.useEffect(() => {
    //TODO fetch names of running server instances
  }, [serverAuthOption?.value]);

  const LoginForm = (
    <Formik
      initialValues={
        omit(initialDatabaseConfig, [
          "title",
          "selectedServerName",
          "filePath",
          "connectionString",
        ]) as IUserState
      }
      validationSchema={Yup.object({
        userName: Yup.string().required("Username is required"),
        password: Yup.string().required("Password is required"),
      })}
      onSubmit={(_) => {}}
    >
      {(props: FormikProps<IUserState>) => {
        const {
          values: { userName, password },
          errors,
          touched,
          handleChange,
        } = props;

        const helperTextUsername =
          touched && touched.userName ? errors && errors.userName : "";
        const helperTextPassword =
          touched && touched.password ? errors && errors.password : "";

        const UserNameComp = (
          <TextField
            name="userName"
            helperText={helperTextUsername}
            error={Boolean(helperTextUsername)}
            value={userName}
            onChange={(e: React.ChangeEvent<any>) => {
              handleChange(e);
              setDatabaseConfig((config) => ({
                ...config,
                userName: e.target.value,
              }));
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            required
            autoFocus
            fullWidth
          />
        );

        const PasswordComp = (
          <TextField
            name="password"
            helperText={helperTextPassword}
            error={Boolean(helperTextPassword)}
            autoComplete="current-password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={(event) => setShowPassword(!showPassword)}
                    size="large"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            required
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e: React.ChangeEvent<any>) => {
              handleChange(e);
              setDatabaseConfig((config) => ({
                ...config,
                userName: e.target.value,
              }));
            }}
            fullWidth
          />
        );

        return (
          <Form className={classes.form}>
            <AnalyticsComp
              title="Username"
              direction="Vertical"
              containerStyle={{ width: "100%" }}
              content={UserNameComp}
            />
            <AnalyticsComp
              title="Password"
              direction="Vertical"
              containerStyle={{ width: "100%" }}
              content={PasswordComp}
            />
          </Form>
        );
      }}
    </Formik>
  );

  const ServerNames = (
    <div>
      <AnalyticsComp
        title="Active Servers"
        direction="Vertical"
        content={
          <ApexSelectRS
            valueOption={serverNameOption}
            data={serverNameOptions}
            handleSelect={(option: OnChangeValue<ISelectOption, false>) =>
              setServerNameOption(option as ISelectOption)
            }
            menuPortalTarget={document.body}
            isSelectOptionType={true}
            containerHeight={40}
          />
        }
      />
      <AnalyticsComp
        title="Authentication"
        direction="Vertical"
        content={
          <ApexSelectRS
            valueOption={serverAuthOption}
            data={serverAuthOptions}
            handleSelect={(option: OnChangeValue<ISelectOption, false>) =>
              setServerAuthOption(option as ISelectOption)
            }
            menuPortalTarget={document.body}
            isSelectOptionType={true}
            containerHeight={40}
          />
        }
      />
      {serverAuthOption?.value === "serverAuth" && LoginForm}
    </div>
  );

  const TestDbsTables = (
    <ApexFlexContainer
      justifyContent="center"
      alignItems="center"
      height={50}
      width={"100%"}
      moreStyles={{ marginBottom: 4 }}
    >
      <BaseButtons
        buttonTexts={["Test", "Databases", "Tables"]}
        variants={["contained", "contained", "contained"]}
        colors={["secondary", "inherit", "primary"]}
        startIcons={[
          <AddLinkOutlinedIcon key={1} />,
          <StorageOutlinedIcon key={2} />,
          <TableChartOutlinedIcon key={2} />,
        ]}
        disableds={[false, false, false]}
        shouldExecute={[true, true, true]}
        shouldDispatch={[false, false, false]}
        finalActions={[() => {}, () => {}, () => {}]}
        applySpace={true}
      />
    </ApexFlexContainer>
  );

  const BrowseExcelFileAndFilePath = (
    <div>
      <AnalyticsComp
        title="Select Workbook"
        content={
          <Button
            variant="contained"
            color="primary"
            onClick={() => {}}
            startIcon={<OpenInNewOutlinedIcon />}
          >
            {"Browse"}
          </Button>
        }
        direction="Vertical"
        containerStyle={{ width: "100%", marginBottom: 20 }}
      />
      <AnalyticsComp
        title="File Path"
        content={
          <div style={{ display: "flex", alignItems: "center" }}>
            <Input
              style={{ width: "100%", height: 40 }}
              value={databaseConfig["filePath"]}
              margin="dense"
              onChange={(event) => {
                const { value } = event.target;
                setDatabaseConfig((prev: any) => ({ ...prev, title: value }));
              }}
            />
            <EditIcon style={getApexIconButtonStyle(theme)} />
          </div>
        }
        direction="Vertical"
        containerStyle={{ width: "100%", marginBottom: 20 }}
      />
    </div>
  );

  const ConnectionStringEdit = (
    <AnalyticsComp
      title="Connection String"
      content={
        <div style={{ display: "flex", alignItems: "center" }}>
          <Input
            style={{ width: "100%", height: 40 }}
            value={databaseConfig["connectionString"]}
            margin="dense"
            onChange={(event) => {
              const { value } = event.target;
              setDatabaseConfig((prev: any) => ({
                ...prev,
                connectionString: value,
              }));
            }}
          />
          <EditIcon style={getApexIconButtonStyle(theme)} />
        </div>
      }
      direction="Vertical"
      containerStyle={{ width: "100%", marginBottom: 20 }}
    />
  );

  const Servers = (
    <>
      {ServerNames}
      {LoginForm}
      {TestDbsTables}
      {ConnectionStringEdit}
    </>
  );

  const FinalButtons = (
    <ApexFlexContainer
      justifyContent="center"
      alignItems="center"
      height={50}
      width={"100%"}
      moreStyles={{ marginBottom: 4 }}
    >
      <BaseButtons
        buttonTexts={["Connect", "Save"]}
        variants={["contained", "contained"]}
        colors={["secondary", "primary"]}
        startIcons={[<LinkIcon key={1} />, <StorageOutlinedIcon key={2} />]}
        disableds={[false, false]}
        shouldExecute={[true, true]}
        shouldDispatch={[false, false]}
        finalActions={[() => {}, () => {}]}
        applySpace={true}
      />
    </ApexFlexContainer>
  );

  return (
    <div
      className={classes.container}
      style={{ width: theme.breakpoints.values["sm"] }}
    >
      <AnalyticsComp
        title="Title"
        direction="Vertical"
        content={
          <Input
            style={{ width: "100%", height: 40 }}
            value={databaseConfig["title"]}
            margin="dense"
            onChange={(event) => {
              const { value } = event.target;
              setDatabaseConfig((prev: any) => ({ ...prev, title: value }));
            }}
          />
        }
      />
      <AnalyticsComp
        title="Data Provider"
        direction="Vertical"
        content={
          <ApexSelectRS
            valueOption={dataProviderOption}
            data={dataProviderOptions}
            handleSelect={(option: OnChangeValue<ISelectOption, false>) =>
              setDataProviderOption(option as ISelectOption)
            }
            menuPortalTarget={document.body}
            isSelectOptionType={true}
            containerHeight={40}
          />
        }
      />
      <hr />
      {dataProviderOption?.value === "msExcel"
        ? BrowseExcelFileAndFilePath
        : Servers}
      {FinalButtons}
    </div>
  );
};

export default ConnectDatabase;
