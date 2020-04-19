import React from "react";
import PropTypes from "prop-types";
import { Icon, Image, Menu, Sidebar } from "semantic-ui-react";
import CompanyLogo from "../Images/CompanyLogo.svg";

const MainMenu = [
  { name: "Import", icon: "window restore outline" },
  { name: "Production Network", icon: "connectdevelop" },
  { name: "Visualization", icon: "chart area" },
  { name: "Settings", icon: "settings" },
];

const MainSidebar = React.memo(({ animation, direction, visible }) => (
  <Sidebar
    as={Menu}
    animation={animation}
    direction={direction}
    icon="labeled"
    vertical
    style={{
      backgroundColor: "#CACBCD",
      width: "100px",
    }}
    visible={visible}
    width="thin"
  >
    {/*make height of logo menu a redux store variable and set with navbar height*/}
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
));

MainSidebar.propTypes = {
  animation: PropTypes.string,
  direction: PropTypes.string,
  visible: PropTypes.bool,
};

export default MainSidebar;
