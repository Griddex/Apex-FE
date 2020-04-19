import React from "react";
import PropTypes from "prop-types";
import { Grid } from "semantic-ui-react";
import SubNavBar from "./../../Application/Components/SubNavBar";
import Footer from "../../Application/Components/Footer";
import ContextSideBar from "./../../Application/Components/ContextSideBar";
//mobile={16} tablet={8} computer={4}  style={{ height: "100vh" }}

const Import = (props) => {
  return (
    <Grid columns={1}>
      <Grid.Row style={{ paddingBottom: 0 }}>
        <Grid.Column>
          <SubNavBar />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row style={{ paddingTop: 0, paddingBottom: 0 }}>
        <Grid.Column>
          <ContextSideBar
            Sidebarcomp={() => <div style={{ height: "660px" }}></div>}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row style={{ paddingTop: 0 }}>
        <Grid.Column>
          <Footer />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

Import.propTypes = {};

export default Import;
