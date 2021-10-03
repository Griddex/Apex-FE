import React from "react";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import ApexSlider from "../../../Visualytics/Components/Sliders/ApexSlider";
import { useDispatch } from "react-redux";
import { AvatarEditorProps, Position } from "react-avatar-editor";
import { TUseState } from "../../../Application/Types/ApplicationTypes";
import { Input } from "@mui/material";

export interface IAvatarControls {
  basePath: string;
  updateParameterAction: (path: string, value: any) => IAction;
  avatarProps: AvatarEditorProps;
  setAvatarProps: TUseState<AvatarEditorProps>;
}

const AvatarControls = ({
  basePath,
  updateParameterAction,
  avatarProps,
  setAvatarProps,
}: IAvatarControls) => {
  const dispatch = useDispatch();

  const { width, height, scale, position, borderRadius, border, rotate } =
    avatarProps;
  console.log(
    "Logged output --> ~ file: AvatarControls.tsx ~ line 219 ~ avatarProps",
    avatarProps
  );

  return (
    <ApexFlexContainer
      justifyContent="space-between"
      moreStyles={{ width: 500, height: 400, flexWrap: "wrap" }}
    >
      <AnalyticsComp
        title="Width"
        direction="Vertical"
        containerStyle={{ marginTop: 5 }}
        content={
          <Input
            name="width"
            style={{ width: 80 }}
            value={width}
            onChange={(event: React.ChangeEvent<any>) => {
              const { value } = event.target;

              setAvatarProps((prev) => ({
                ...prev,
                width: value,
              }));

              updateParameterAction &&
                dispatch(updateParameterAction(`${basePath}.width`, value));
            }}
            required
            autoFocus
            fullWidth
          />
        }
      />
      <AnalyticsComp
        title="Height"
        direction="Vertical"
        containerStyle={{ marginTop: 5 }}
        content={
          <Input
            name="height"
            style={{ width: 80 }}
            value={height}
            onChange={(event: React.ChangeEvent<any>) => {
              const { value } = event.target;

              setAvatarProps((prev) => ({
                ...prev,
                height: value,
              }));

              updateParameterAction &&
                dispatch(updateParameterAction(`${basePath}.height`, value));
            }}
            required
            autoFocus
            fullWidth
          />
        }
      />

      <AnalyticsComp
        title="Scale"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ApexSlider
            name="scale"
            sliderValue={scale as number}
            step={1}
            min={0}
            max={400}
            actionPath={`${basePath}.scale`}
            action={(path, value) =>
              updateParameterAction &&
              dispatch(updateParameterAction(path, value))
            }
            sliderContextFxn={(value: any) => {
              setAvatarProps((prev) => ({
                ...prev,
                scale: value,
              }));
            }}
          />
        }
      />

      <AnalyticsComp
        title="X Position"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ApexSlider
            name="xPosition"
            sliderValue={(position as Position).x as number}
            step={0.1}
            min={0}
            max={1}
            actionPath={`${basePath}.position`}
            action={(path, value) =>
              updateParameterAction &&
              dispatch(updateParameterAction(path, { ...position, x: value }))
            }
            sliderContextFxn={(value: any) => {
              setAvatarProps((prev) => ({
                ...prev,
                position: { ...(prev["position"] as Position), x: value },
              }));
            }}
          />
        }
      />

      <AnalyticsComp
        title="Y Position"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ApexSlider
            name="yPosition"
            sliderValue={(position as Position).y as number}
            step={0.1}
            min={0}
            max={1}
            actionPath={`${basePath}.position`}
            action={(path, value) =>
              updateParameterAction &&
              dispatch(
                updateParameterAction(path, { ...position, y: Number(value) })
              )
            }
            sliderContextFxn={(value: any) => {
              setAvatarProps((prev) => ({
                ...prev,
                position: {
                  ...(prev["position"] as Position),
                  y: Number(value),
                },
              }));
            }}
          />
        }
      />

      <AnalyticsComp
        title="Border Radius"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ApexSlider
            name="borderRadius"
            sliderValue={borderRadius as number}
            step={1}
            min={0}
            max={0.5 * (width as number)}
            actionPath={`${basePath}.borderRadius`}
            action={(path, value) =>
              updateParameterAction &&
              dispatch(updateParameterAction(path, value))
            }
            sliderContextFxn={(value: any) => {
              setAvatarProps((prev) => ({
                ...prev,
                borderRadius: value,
              }));
            }}
          />
        }
      />

      <AnalyticsComp
        title="Rotate"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ApexSlider
            name="rotate"
            sliderValue={rotate as number}
            step={1}
            min={0}
            max={360}
            actionPath={`${basePath}.rotate`}
            action={(path, value) =>
              updateParameterAction &&
              dispatch(updateParameterAction(path, value))
            }
            sliderContextFxn={(value: any) => {
              setAvatarProps((prev) => ({
                ...prev,
                rotate: value,
              }));
            }}
          />
        }
      />
    </ApexFlexContainer>
  );
};

export default AvatarControls;
