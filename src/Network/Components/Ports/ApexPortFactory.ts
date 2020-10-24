import { AbstractModelFactory } from "@projectstorm/react-canvas-core";
import { DiagramEngine, PortModel } from "@projectstorm/react-diagrams";

export class ApexPortFactory extends AbstractModelFactory<
  PortModel,
  DiagramEngine
> {
  cb: (initialConfig?: any) => PortModel;

  constructor(type: string, cb: (initialConfig?: any) => PortModel) {
    super(type);
    this.cb = cb;
  }

  generateModel(event: { initialConfig?: any }): PortModel {
    return this.cb(event.initialConfig);
  }
}