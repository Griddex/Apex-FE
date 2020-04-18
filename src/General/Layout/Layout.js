import React, { Suspense, lazy } from "react";
import { Segment, Sidebar, Loader } from "semantic-ui-react";
import InViewModal from "../Components/InViewModal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  logoutUserAction,
  logoutCloseModalAction,
  logoutOpenModalAction,
} from "./../../Redux/Actions/UILayoutActions";
import MainSidebar from "./../Components/MainSideBar";
import NavBar from "./../Components/NavBar";

const Network = lazy(() => import("../../Routes/Network/Network"));

const Layout = (props) => {
  const { dispatch, logoutModalOpen } = props;
  const boundlogoutModalActionCreators = bindActionCreators(
    { logoutUserAction, logoutCloseModalAction, logoutOpenModalAction },
    dispatch
  );

  return (
    <Sidebar.Pushable as={Segment}>
      <MainSidebar animation="push" direction="left" visible={true} />
      {/* make 100px a redux store variable and set with mainsidebar width*/}
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
            <Network />
          </Suspense>
        </Segment>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

const mapStateToProps = (state) => {
  return {
    logoutModalOpen: state.UILayoutReducer.logoutModalOpen || false,
  };
};

export default connect(mapStateToProps, null)(Layout);
