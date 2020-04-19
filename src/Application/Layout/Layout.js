import React, { Suspense, lazy } from "react";
import { Segment, Sidebar, Loader, Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InViewModal from "../Components/InViewModal";
import {
  logoutUserAction,
  logoutCloseModalAction,
  logoutOpenModalAction,
} from "../Redux/Actions/UILayoutActions";
import MainSidebar from "../Components/MainSideBar";
import NavBar from "../Components/NavBar";
import Import from "../../Import/Routes/Import";

const Network = lazy(() => import("../../Network/Network"));

const Layout = (props) => {
  const { dispatch, logoutModalOpen } = props;
  const boundlogoutModalActionCreators = bindActionCreators(
    { logoutUserAction, logoutCloseModalAction, logoutOpenModalAction },
    dispatch
  );
  //style={{ height: "100vh", width: "100vw" }}
  return (
    <Grid columns={1} style={{ height: "100vh" }}>
      <Grid.Row>
        <Grid.Column>
          <Sidebar.Pushable as={Segment}>
            <MainSidebar animation="push" direction="left" visible={true} />
            {/* make 100px a redux store variable and set with pusher width*/}
            <Sidebar.Pusher style={{ transform: "translate3d(100px,0,0)" }}>
              <Segment basic style={{ padding: 0 }}>
                <NavBar logoutActionCreators={boundlogoutModalActionCreators} />
                <Suspense
                  fallback={
                    <Segment dimmed="true">
                      <Loader content="Loading" />
                    </Segment>
                  }
                >
                  <InViewModal
                    modalOpen={logoutModalOpen}
                    size="mini"
                    message="Are you sure you want log out of your account?"
                    actions={boundlogoutModalActionCreators}
                  />
                  {/* Get a function to return the correct back ground after any main mennu item is clicked */}
                  {/* <Network style={{ zindex: -1 }} /> */}
                  <Import />
                </Suspense>
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    logoutModalOpen: state.UILayoutReducer.logoutModalOpen || false,
  };
};

export default connect(mapStateToProps, null)(Layout);
