import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Header,
  Form,
  Grid,
  Transition,
  Image,
} from "semantic-ui-react";
import CompanyLogo from "../../Images/CompanyLogo.svg";
import history from "./../../General/Services/HistoryService";

export default class LoginView extends Component {
  state = { animation: "jiggle", duration: 500, visible: true };

  componentDidMount() {
    this.setState((prevState) => ({
      animation: "scale",
      duration: 500,
      visible: true,
    }));
  }

  toggleVisibility = () =>
    this.setState((prevState) => ({
      animation: "jiggle",
      duration: 500,
      visible: !prevState.visible,
    }));
  render() {
    const { animation, duration, visible } = this.state;

    return (
      <Grid
        stackable
        verticalAlign="middle"
        centered
        columns={8}
        style={{ height: "100vh" }}
      >
        <Grid.Column mobile={16} tablet={8} computer={4}>
          <Transition
            visible={visible}
            animation={animation}
            duration={duration}
          >
            <Image
              src={CompanyLogo}
              style={{ height: "15vmin" }}
              onClick={this.toggleVisibility}
              centered
              alt="Hydrocarbon Forecasting Platform Company Logo"
            />
          </Transition>
          <Header as="h3" textAlign="center">
            Hydrocarbon Forecasting Platform
          </Header>
          <br />
          <br />
          <Form>
            <Form.Input
              icon="user"
              iconPosition="left"
              label="Username"
              placeholder="Username"
              size="big"
            />
            <Form.Input
              icon="lock"
              iconPosition="left"
              label="Password"
              type="password"
              size="big"
            />
            <Button
              content="Login"
              size="huge"
              // positive
              style={{ backgroundColor: "#85B7D9" }}
              onClick={() => history.replace("/network")}
            />
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

LoginView.propTypes = {};
