import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import * as React from "react";
import { WellheadNodeModel } from "./WellheadNodeModel";
import { WellheadNodeWidget } from "./WellheadNodeWidget";

export class WellheadNodeFactory extends AbstractReactFactory<
  WellheadNodeModel,
  DiagramEngine
> {
  constructor() {
    super("wellhead");
  }

  generateReactWidget(event: { model: WellheadNodeModel }): JSX.Element {
    return (
      <WellheadNodeWidget size={50} engine={this.engine} node={event.model} />
    );
  }

  generateModel(event: {}): WellheadNodeModel {
    return new WellheadNodeModel();
  }
}
