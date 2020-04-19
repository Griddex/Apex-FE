import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Image,
  Transition,
  Header,
  Button,
  Divider,
  Grid,
} from "semantic-ui-react";
import history from "./../../Services/HistoryService";
import CompanyLogo from "../../Images/CompanyLogo.svg";

export default class LandingView extends Component {
  state = { animation: "jiggle", duration: 500, visible: true };

  componentDidMount() {
    this.setState((prevState) => ({
      animation: "scale",
      duration: 1000,
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
        <Grid.Row>
          <Grid.Column textAlign="center" mobile={16} tablet={8} computer={4}>
            <Transition
              visible={visible}
              animation={animation}
              duration={duration}
            >
              <Image
                src={CompanyLogo}
                style={{ height: "30vmin" }}
                onClick={this.toggleVisibility}
                centered
                alt="Hydrocarbon Forecasting Platform Company Logo"
              />
            </Transition>
            <Header as="h1">Hydrocarbon Forecasting Platform</Header>
            <Header as="h3" style={{ color: "#808080" }}>
              Our platform delivers the best hydrocarbon business forecasting
              services globally!
            </Header>
            <Divider />
            <br />
            <Button
              content="Login"
              size="huge"
              // positive
              style={{ backgroundColor: "#85B7D9" }}
              onClick={() => history.push("/login")}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
