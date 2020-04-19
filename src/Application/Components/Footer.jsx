import React from "react";
import PropTypes from "prop-types";
import { Tab, Container } from "semantic-ui-react";

const panes = [
  { menuItem: "Tab 1", render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
  { menuItem: "Tab 2", render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
  { menuItem: "Tab 3", render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
];

//  const handleRangeChange = (e) => this.setState({ activeIndex: e.target.value })
//  const handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex })

const Footer = (props) => {
  return (
    <Container textAlign="left" fluid>
      <Tab
        panes={panes}
        activeIndex={0}
        //   onTabChange={this.handleTabChange}
        style={{ padding: 0 }}
      />
    </Container>
  );
};

Footer.propTypes = {};

export default Footer;
