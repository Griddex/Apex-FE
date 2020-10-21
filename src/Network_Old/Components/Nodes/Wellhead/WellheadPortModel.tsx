import {
  AbstractModelFactory,
  DeserializeEvent,
} from "@projectstorm/react-canvas-core";
import {
  LinkModel,
  PortModel,
  PortModelAlignment,
  PortModelGenerics,
  PortModelOptions,
} from "@projectstorm/react-diagrams-core";
import { DefaultLinkModel } from "@projectstorm/react-diagrams-defaults";

export interface WellheadPortModelOptions extends PortModelOptions {
  label?: string;
  in?: boolean;
}

export interface WellheadPortModelGenerics extends PortModelGenerics {
  OPTIONS: WellheadPortModelOptions;
}

// export class WellheadPortModel extends PortModel<WellheadPortModelGenerics> {
export class WellheadPortModel extends PortModel<WellheadPortModelGenerics> {
  constructor(isIn: boolean, name?: string, label?: string);
  constructor(options: WellheadPortModelOptions);
  constructor(
    options: WellheadPortModelOptions | boolean,
    name?: string,
    label?: string
  ) {
    if (!!name) {
      options = {
        in: !!options,
        name: name,
        label: label,
      };
    }
    options = options as WellheadPortModelOptions;
    super({
      label: options.label || options.name,
      alignment: options.in
        ? PortModelAlignment.LEFT
        : PortModelAlignment.RIGHT,
      type: "wellhead",
      ...options,
    });
  }

  deserialize(event: DeserializeEvent<this>) {
    super.deserialize(event);
    this.options.in = event.data.in;
    this.options.label = event.data.label;
  }

  serialize() {
    return {
      ...super.serialize(),
      in: this.options.in,
      label: this.options.label,
    };
  }

  link<T extends LinkModel>(
    port: PortModel,
    factory?: AbstractModelFactory<T>
  ): T {
    let link = this.createLinkModel(factory);
    link.setSourcePort(this);
    link.setTargetPort(port);
    return link as T;
  }

  canLinkToPort(port: PortModel): boolean {
    if (port instanceof WellheadPortModel) {
      return this.options.in !== port.getOptions().in;
    }
    return true;
  }

  createLinkModel(factory?: AbstractModelFactory<LinkModel>): LinkModel {
    let link = super.createLinkModel();
    if (!link && factory) {
      return factory.generateModel({});
    }
    return link || new DefaultLinkModel();
  }
}
