import React from "react";
import PropTypes from "prop-types";
import faker from "faker";
import {
  Header,
  Icon,
  Image,
  Menu,
  Responsive,
  Label,
  Button,
} from "semantic-ui-react";

const NavBar = React.memo(({ children, logoutActionCreators }) => (
  <Responsive>
    <Menu
      size="small"
      borderless
      style={{ borderWidth: "0.5px", width: "calc(100%-180px)" }}
    >
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
          <Button onClick={() => logoutActionCreators.logoutOpenModalAction()}>
            Logout
          </Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
    {children}
  </Responsive>
));

NavBar.propTypes = {
  children: PropTypes.node,
};

export default NavBar;
