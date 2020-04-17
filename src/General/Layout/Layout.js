import PropTypes from "prop-types";
import faker from "faker";
import React, { Component, Suspense, lazy } from "react";
import {
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
  Loader,
  Responsive,
  Label,
  Button,
  Dropdown,
  Grid,
} from "semantic-ui-react";
import { Switch } from "react-router-dom";
import CompanyLogo from "../../Images/CompanyLogo.svg";
import history from "../Services/HistoryService";

const Network = lazy(() => import("../../Routes/Network/Network"));

const MainMenu = [
  { name: "Import", icon: "window restore outline" },
  { name: "Production Network", icon: "connectdevelop" },
  { name: "Visualization", icon: "chart area" },
  { name: "Settings", icon: "settings" },
];

const MainSidebar = ({ animation, direction, visible }) => (
  <Sidebar
    as={Menu}
    animation={animation}
    direction={direction}
    icon="labeled"
    vertical
    style={{ backgroundColor: "#CACBCD", width: "100px" }}
    visible={visible}
    width="thin"
  >
    <Menu.Item style={{ backgroundColor: "white" }}>
      <Image
        src={CompanyLogo}
        style={{ height: "4.5vmin" }}
        centered
        alt="Hydrocarbon Forecasting Platform Company Logo"
      />
    </Menu.Item>
    {MainMenu.map((menu, i) => {
      return (
        <Menu.Item as="a" key={i}>
          <Icon name={menu.icon} />
          {menu.name}
        </Menu.Item>
      );
    })}
  </Sidebar>
);

MainSidebar.propTypes = {
  animation: PropTypes.string,
  direction: PropTypes.string,
  visible: PropTypes.bool,
};

const Navbar = (props) => {
  const { children } = props;

  return (
    <Responsive style={{ width: "calc(100%-100px)" }}>
      <Menu size="small" borderless style={{ borderWidth: "1px" }}>
        <Menu.Menu position="right">
          <Menu.Item>
            <Icon name="bell" color="grey" size="large" />
            <Label
              style={{
                transform: "translate(-40%, 130%)",
              }}
              color="red"
              floating
            >
              222
            </Label>
          </Menu.Item>
          <Menu.Item style={{ marginLeft: "20px" }}>
            <Image src={faker.internet.avatar()} avatar />
            <Menu.Item style={{ marginLeft: "2px" }}>
              <Header as="h4" color="grey">
                {faker.name.findName()}
              </Header>
            </Menu.Item>
            <Menu.Item style={{ marginLeft: "2px" }}>
              <Icon name="chevron down" color="grey" />
            </Menu.Item>
          </Menu.Item>
          <Menu.Item>
            <Button onClick={() => history.replace("/login")}>Logout</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      {children}
    </Responsive>
  );
};

Navbar.propTypes = {
  children: PropTypes.node,
};

export default class Layout extends Component {
  state = {
    animation: "push",
    direction: "left",
    visible: true,
  };

  render() {
    const { animation, direction, visible } = this.state;

    return (
      <Sidebar.Pushable as={Segment}>
        <Navbar />
        <MainSidebar
          animation={animation}
          direction={direction}
          visible={visible}
        />

        <Sidebar.Pusher>
          <Segment basic>
            <Suspense
              fallback={
                <Segment dimmed="true">
                  <Loader content="Loading" />
                </Segment>
              }
            >
              <Switch>
                <Network />
              </Switch>
            </Suspense>
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}
