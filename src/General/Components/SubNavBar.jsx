import React from "react";
import PropTypes from "prop-types";
import { Step } from "semantic-ui-react";

const SubNavBar = (props) => {
  // const MainMenu = [
  //     { name: "Import", icon: "window restore outline" },
  //     { name: "Production Network", icon: "connectdevelop" },
  //     { name: "Visualization", icon: "chart area" },
  //     { name: "Settings", icon: "settings" },
  //   ];

  const subNavbarItems = {
    Import: [
      { name: "Facilities Deck", icon: "warehouse" },
      { name: "Forecast Deck", icon: "fork" },
      { name: "Production Data", icon: "product hunt" },
      { name: "Economics Data", icon: "money bill alternate" },
    ],
  };

  //select the correct subnavbar using mainmenu prop

  return (
    <Step.Group stackable="tablet">
      {subNavbarItems["Import"].map((item, i) => (
        <Step link key={i}>
          <Icon name={item.icon} />
          <Step.Content>
            <Step.Title>{item.name}</Step.Title>
          </Step.Content>
        </Step>
      ))}
    </Step.Group>
  );
};

SubNavBar.propTypes = {};

export default SubNavBar;
