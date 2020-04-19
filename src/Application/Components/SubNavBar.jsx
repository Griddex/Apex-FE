import React, { useState } from "react";
import PropTypes from "prop-types";
import { Step, Icon, Container, Accordion } from "semantic-ui-react";

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
  const [activeIndex, setActiveIndex] = useState(0);
  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  };
  return (
    <Container textAlign="left" fluid style={{ backgroundColor: "#F0F0F0" }}>
      {/* <Accordion>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          fluid
          onClick={handleClick}
          style={{ padding: 0 }}
        >
          <Icon name="dropdown" />
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0} style={{ padding: 0 }}> */}
      <Step.Group size="mini" unstackable attached="top">
        {subNavbarItems["Import"].map((item, i) => (
          <Step link key={i} style={{ padding: "4px 20px" }}>
            <Icon name={item.icon} />
            <Step.Content>
              <Step.Title>{item.name}</Step.Title>
            </Step.Content>
          </Step>
        ))}
      </Step.Group>
      {/* </Accordion.Content>
      </Accordion> */}
    </Container>
  );
};

SubNavBar.propTypes = {};

export default SubNavBar;
