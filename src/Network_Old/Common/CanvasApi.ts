import * as SRD from "@projectstorm/react-diagrams";
import { WellheadNodeFactory } from "../Components/Nodes/Wellhead/WellheadNodeFactory";
import { WellheadPortModel } from "../Components/Nodes/Wellhead/WellheadPortModel";
import { ApexPortFactory } from "../Components/Ports/ApexPortFactory";

export class CanvasApi {
  activeModel: SRD.DiagramModel;
  diagramEngine: SRD.DiagramEngine;

  constructor() {
    this.diagramEngine = SRD.default();
    this.activeModel = new SRD.DiagramModel();
    this.registerCustomFactories();
    this.setModel();
  }

  public registerCustomFactories() {
    this.diagramEngine
      .getPortFactories()
      .registerFactory(
        new ApexPortFactory(
          "wellhead",
          (config) => new WellheadPortModel(true, "P1")
        )
      );
    this.diagramEngine
      .getNodeFactories()
      .registerFactory(new WellheadNodeFactory());
  }

  public getActiveDiagram(): SRD.DiagramModel {
    return this.activeModel;
  }

  public getDiagramEngine(): SRD.DiagramEngine {
    return this.diagramEngine;
  }

  public setModel(): void {
    return this.diagramEngine.setModel(this.activeModel);
  }
}
