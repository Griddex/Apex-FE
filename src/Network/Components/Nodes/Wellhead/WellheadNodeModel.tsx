import { BasePositionModelOptions } from "@projectstorm/react-canvas-core";
import {
  NodeModel,
  NodeModelGenerics,
  PortModelAlignment,
} from "@projectstorm/react-diagrams-core";
import { WellheadPortModel } from "./WellheadPortModel";

export interface WellheadNodeModelOptions extends BasePositionModelOptions {
  name?: string;
  color?: string;
}

// export interface WellheadNodeModelGenerics extends NodeModelGenerics {
//   OPTIONS: WellheadNodeModelOptions;
// }
export interface WellheadNodeModelGenerics {
  PORT: WellheadNodeModelOptions;
}

export class WellheadNodeModel extends NodeModel<
  NodeModelGenerics & WellheadNodeModelGenerics
> {
  // protected portsIn: WellheadPortModel[];
  // protected portsOut: WellheadPortModel[];

  constructor() {
    super({ type: "wellhead" });
    this.addPort(new WellheadPortModel(PortModelAlignment.TOP));
    this.addPort(new WellheadPortModel(PortModelAlignment.LEFT));
    this.addPort(new WellheadPortModel(PortModelAlignment.BOTTOM));
    this.addPort(new WellheadPortModel(PortModelAlignment.RIGHT));
  }

  // constructor(name: string, color: string);
  // constructor(options?: WellheadNodeModelOptions);
  // constructor(options: any = {}, color?: string) {
  //   if (typeof options === "string") {
  //     options = {
  //       name: options,
  //       color: color,
  //     };
  //   }
  //   super({
  //     type: "default",
  //     name: "Untitled",
  //     color: "rgb(0,192,255)", //use company brand color?
  //     ...options,
  //   });
  //   this.portsOut = [];
  //   this.portsIn = [];
  // }

  // doClone(lookupTable: {}, clone: any): void {
  //   clone.portsIn = [];
  //   clone.portsOut = [];
  //   super.doClone(lookupTable, clone);
  // }

  // removePort(port: WellheadPortModel): void {
  //   super.removePort(port);
  //   if (port.getOptions().in) {
  //     this.portsIn.splice(this.portsIn.indexOf(port), 1);
  //   } else {
  //     this.portsOut.splice(this.portsOut.indexOf(port), 1);
  //   }
  // }

  // addPort<T extends WellheadPortModel>(port: T): T {
  //   super.addPort(port);
  //   if (port.getOptions().in) {
  //     if (this.portsIn.indexOf(port) === -1) {
  //       this.portsIn.push(port);
  //     }
  //   } else {
  //     if (this.portsOut.indexOf(port) === -1) {
  //       this.portsOut.push(port);
  //     }
  //   }
  //   return port;
  // }

  // addInPort(label: string, after = true): WellheadPortModel {
  //   const p = new WellheadPortModel({
  //     in: true,
  //     name: label,
  //     label: label,
  //     alignment: PortModelAlignment.LEFT,
  //   });
  //   if (!after) {
  //     this.portsIn.splice(0, 0, p);
  //   }
  //   return this.addPort(p);
  // }

  // addOutPort(label: string, after = true): WellheadPortModel {
  //   const p = new WellheadPortModel({
  //     in: false,
  //     name: label,
  //     label: label,
  //     alignment: PortModelAlignment.RIGHT,
  //   });
  //   if (!after) {
  //     this.portsOut.splice(0, 0, p);
  //   }
  //   return this.addPort(p);
  // }

  // deserialize(event: DeserializeEvent<this>) {
  //   super.deserialize(event);
  //   this.options.name = event.data.name;
  //   this.options.color = event.data.color;
  //   this.portsIn = _.map(event.data.portsInOrder, (id) => {
  //     return this.getPortFromID(id);
  //   }) as WellheadPortModel[];
  //   this.portsOut = _.map(event.data.portsOutOrder, (id) => {
  //     return this.getPortFromID(id);
  //   }) as WellheadPortModel[];
  // }

  // serialize(): any {
  //   return {
  //     ...super.serialize(),
  //     name: this.options.name,
  //     color: this.options.color,
  //     portsInOrder: _.map(this.portsIn, (port) => {
  //       return port.getID();
  //     }),
  //     portsOutOrder: _.map(this.portsOut, (port) => {
  //       return port.getID();
  //     }),
  //   };
  // }

  // getInPorts(): WellheadPortModel[] {
  //   return this.portsIn;
  // }

  // getOutPorts(): WellheadPortModel[] {
  //   return this.portsOut;
  // }
}
