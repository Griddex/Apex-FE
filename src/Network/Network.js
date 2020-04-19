import React from "react";
import { Grid, Image, Header } from "semantic-ui-react";
import Pipeline from "./Images/Pipeline.svg";

const Network = () => {
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
          <Header as="h1">Production Network</Header>
          <Image
            src={Pipeline}
            style={{ height: "30vmin" }}
            centered
            alt="Pipeline"
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Network;
