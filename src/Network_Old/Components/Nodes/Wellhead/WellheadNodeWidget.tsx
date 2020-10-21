import styled from "@emotion/styled";
import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams-core";
import {
  DefaultPortLabel,
  DefaultPortModel,
} from "@projectstorm/react-diagrams-defaults";
import * as React from "react";
import { WellheadNodeModel } from "./WellheadNodeModel";

namespace S {
  export const Node = styled.div<{ background: string; selected: boolean }>`
    background-color: ${(p) => p.background || "white"};
    border-radius: 5px;
    font-family: sans-serif;
    color: white;
    border: solid 2px black;
    overflow: visible;
    font-size: 11px;
    border: solid 2px ${(p) => (p.selected ? "rgb(0,192,255)" : "black")};
  `;

  export const Title = styled.div`
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    white-space: nowrap;
    justify-items: center;
  `;

  export const TitleName = styled.div`
    flex-grow: 1;
    padding: 5px 5px;
  `;

  export const Port = styled.div`
    width: 16px;
    height: 16px;
    z-index: 10;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    cursor: pointer;
    &:hover {
      background: rgba(0, 0, 0, 1);
    }
  `;

  export const Ports = styled.div`
    display: flex;
    background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2));
  `;

  export const PortsContainer = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    &:first-of-type {
      margin-right: 10px;
    }

    &:only-child {
      margin-right: 0px;
    }
  `;
}
export interface WellheadNodeWidgetProps {
  node: WellheadNodeModel;
  engine: DiagramEngine;
  size: number;
}

/**
 * Default node that models the WellheadNodeModel. It creates two columns
 * for both all the input ports on the left, and the output ports on the right.
 */
export class WellheadNodeWidget extends React.Component<
  WellheadNodeWidgetProps
> {
  generatePort = (port: DefaultPortModel) => {
    return (
      <DefaultPortLabel
        engine={this.props.engine}
        port={port}
        key={port.getID()}
      />
    );
  };

  render() {
    console.log("Logged output -->: render -> this.props", this.props);
    return (
      <div
        data-default-node-name={this.props.node.getOptions().name}
        // className={"wellhead-node"}
        style={{
          position: "relative",
          // width: this.props.size,
          width: 40,
          // height: this.props.size,
          height: 40,
        }}
      >
        {/* <img src={Wellhead} style={{ height: 40, width: 40 }} /> */}
        <div style={{ height: 40, width: 40, backgroundColor: "red" }} />
        <PortWidget
          style={{
            top: this.props.size / 2 - 8,
            left: -8,
            position: "absolute",
          }}
          port={this.props.node.getPort("in")}
          engine={this.props.engine}
        >
          <S.Port />
        </PortWidget>
        <PortWidget
          style={{
            left: this.props.size / 2 - 8,
            top: -8,
            position: "absolute",
          }}
          port={this.props.node.getPort("out")}
          engine={this.props.engine}
        >
          <S.Port />
        </PortWidget>
        {/* <PortWidget
          style={{
            left: this.props.size - 8,
            top: this.props.size / 2 - 8,
            position: "absolute",
          }}
          port={this.props.node.getPort(PortModelAlignment.RIGHT)}
          engine={this.props.engine}
        >
          <S.Port />
        </PortWidget>
        <PortWidget
          style={{
            left: this.props.size / 2 - 8,
            top: this.props.size - 8,
            position: "absolute",
          }}
          port={this.props.node.getPort(PortModelAlignment.BOTTOM)}
          engine={this.props.engine}
        >
          <S.Port />
        </PortWidget> */}
      </div>
    );
  }
}
